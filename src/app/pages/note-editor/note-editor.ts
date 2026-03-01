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
export class NoteEditor {
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

      // Add more color code for randoming
      const colors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];
      const newTag: TagDTO = {
        id: '',
        name: val,
        colorCode: colors[this.tags().length % colors.length],
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
}
