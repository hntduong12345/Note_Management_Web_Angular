// Components
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, Save, Tag as TagIcon, X, CircleAlert } from 'lucide-angular';

// Services
import { NoteService } from '../../services/note.service';
import { CategoryService } from '../../services/category.service';

// Models or DTOs
import { NoteRequest, TagDTO } from '../../dtos/note.dto';
import { CreateTagRequest } from '../../dtos/note.dto';
import { CategoryResponse } from '../../dtos/category.dto';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: `note-editor.html`,
})
export class NoteEditor implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noteService = inject(NoteService);
  private categoryService = inject(CategoryService);

  // Icons Declare
  readonly SaveIcon = Save;
  readonly TagIcon = TagIcon;
  readonly XIcon = X;
  readonly AlertIcon = CircleAlert;

  // Declare variable signals
  noteId = signal<string | null>(null);
  title = signal('');
  content = signal('');
  tags = signal<TagDTO[]>([]);
  tagInput = signal('');
  updatedAt = signal('');

  saved = signal(true);
  isProcessing = signal(false);

  categories = signal<CategoryResponse[]>([]);
  selectedCategoryId = signal<string>('');

  wordCount = computed(() => {
    const text = this.content().trim();
    return text ? text.split(/\s+/).length : 0;
  });

  ngOnInit() {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteId.set(id);
      this.loadNoteDetails(id);
    }
  }

  loadCategories() {
    this.isProcessing.set(true);
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res);
        if (!this.noteId() && res.length > 0) {
          this.selectedCategoryId.set(res[0].id);
        }
      },
      error: (err) => {
        console.log('Failed to load categories', err);
      },
    });
  }

  loadNoteDetails(id: string) {
    this.isProcessing.set(true);
    this.noteService.getNoteDetail(id).subscribe({
      next: (res) => {
        if (res.contentBody) {
          this.content.set(res.contentBody.content || '');
        }
        this.title.set(res.title);
        this.selectedCategoryId.set(res.categoryId);
        this.tags.set(res.tags || []);
        this.updatedAt.set(res.updatedAt);

        this.isProcessing.set(true);
        this.saved.set(true);

        //Complete setup
        this.isProcessing.set(false);
      },
      error: (err) => {
        console.error('Failed to load note', err);
        this.isProcessing.set(false);
      },
    });
  }

  saveNote() {
    if (!this.title().trim()) return;

    this.isProcessing.set(true);
    const createTagsRequest: CreateTagRequest[] = this.tags().map((tag) => ({
      name: tag.name,
      color: tag.colorCode || '#3b82f6',
    }));

    const request: NoteRequest = {
      title: this.title(),
      contentBody: {
        title: this.title(),
        content: this.content(),
      },
      categoryId: this.selectedCategoryId(),
      tagRequest: createTagsRequest,
      lastSyncAt: new Date().toISOString(),
    };

    const id = this.noteId();
    const action$ = id
      ? this.noteService.updateNote(id, request)
      : this.noteService.createNote(request);

    // Trigger data actions
    action$.subscribe({
      next: (res) => {
        this.saved.set(true);
        this.isProcessing.set(false);
        if (!id) {
          this.router.navigate(['/notes', res.id]);
        }
      },
      error: (err) => {
        console.error('Save failed, err');
        this.isProcessing.set(false);
      },
    });
  }

  handleContentChange() {
    this.saved.set(false);
  }

  addTag(event: any) {
    const val = this.tagInput().trim();
    if (val) {
      //Check duplicated tag inputed
      if (this.tags().find((tag) => tag.name.toLocaleLowerCase() === val.toLocaleLowerCase())) {
        // Clear UI inputs
        this.tagInput.set('');
        return;
      }

      // Setup tag color
      const color = this.generateTagColor(val);
      const newTag: TagDTO = {
        id: '',
        name: val,
        colorCode: color,
      };

      this.tags.update((prev) => [...prev, newTag]);
      this.saved.set(false);
      this.tagInput.set('');
    }
  }

  removeTag(tagName: string) {
    this.tags.update((prev) => prev.filter((t) => t.name !== tagName));
    this.saved.set(false);
  }

  // Helper generate random color code
  generateTagColor(tagName: string): string {
    const colors = [
      // Red group
      '#ef4444', // Red
      '#dc2626', // Red 600
      '#b91c1c', // Red 700
      '#fb7185', // Rose
      '#e11d48', // Rose 600
      '#be123c', // Rose 700
      // Orange group
      '#f97316', // Orange
      '#ea580c', // Orange 600
      '#c2410c', // Orange 700
      '#f59e0b', // Amber
      '#fbbf24', // Amber 400
      '#d97706', // Amber 600
      '#a16207', // Amber 700
      // Yelow group
      '#eab308', // Yellow 500
      '#ca8a04', // Yellow 600
      '#84cc16', // Lime 500
      '#65a30d', // Lime 600
      '#4d7c0f', // Lime 700
      // Green group
      '#22c55e', // Green 500
      '#16a34a', // Green 600
      '#15803d', // Green 700
      '#14b8a6', // Teal 500
      '#0d9488', // Teal 600
      '#10b981', // Emerald
      // Blue group
      '#3b82f6', // Blue
      '#2563eb', // Blue 600
      '#1d4ed8', // Blue 700
      '#60a5fa', // Light Blue
      '#0ea5e9', // Sky 500
      '#0284c7', // Sky 600
      '#06b6d4', // Cyan
      // Purple group
      '#6366f1', // Indigo 500
      '#4f46e5', // Indigo 600
      '#8b5cf6', // Violet
      '#7c3aed', // Violet 600
      '#6d28d9', // Violet 700
      '#a855f7', // Purple 500
      // Pink group
      '#ec4899', // Pink
      '#d946ef', // Fuchsia 500
      '#c026d3', // Fuchsia 600
      '#f472b6', // Pink 400
      '#db2777', // Pink 600
      '#9d174d', // Pink 800
      // Neutral group
      '#64748b', // Slate 500
      '#475569', // Slate 600
      '#334155', // Slate 700
      '#6b7280', // Gray 500
      '#374151', // Gray 700
    ];

    // Take random index from the colors list
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Ensure no index out of bound
    const index = Math.abs(randomIndex) % colors.length;
    return colors[index];
  }
}
