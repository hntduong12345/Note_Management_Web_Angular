import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, Save, Tag as TagIcon, X, CircleAlert } from 'lucide-angular';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: `note-editor.html`,
})
export class NoteEditor {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Icons Declare
  readonly SaveIcon = Save;
  readonly TagIcon = TagIcon;
  readonly XIcon = X;
  readonly AlertIcon = CircleAlert;

  // Declare variable signals
  title = signal('');
  content = signal('');
  category = signal('Personal');
  tags = signal<any[]>([]);
  tagInput = signal('');
  saved = signal(true);

  categoryNames = ['Frontend', 'Backend', 'UI', 'Database', 'DevOps', 'Personal'];

  // Equivalent to React's wordCount useMemo
  wordCount = computed(() => {
    const text = this.content().trim();
    return text ? text.split(/\s+/).length : 0;
  });

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId && noteId !== 'new') {
      // Mock loading existing note logic
      this.title.set('React Router Navigation');
      this.content.set('Existing content...');
      this.tags.set([{ name: 'react', color: '#3b82f6' }]);
    }
  }

  handleContentChange() {
    this.saved.set(false);
  }

  addTag(event: any) {
    const val = this.tagInput().trim();
    if (val) {
      const colors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];
      const newTag = {
        name: val,
        color: colors[this.tags().length % colors.length],
      };

      if (!this.tags().find((t) => t.name.toLowerCase() === val.toLowerCase())) {
        this.tags.update((prev) => [...prev, newTag]);
        this.saved.set(false);
      }
      this.tagInput.set('');
    }
  }

  removeTag(tagName: string) {
    this.tags.update((prev) => prev.filter((t) => t.name !== tagName));
    this.saved.set(false);
  }

  saveNote() {
    // Call your NoteService.save here
    console.log('Saving:', { title: this.title(), content: this.content() });
    this.saved.set(true);
  }
}
