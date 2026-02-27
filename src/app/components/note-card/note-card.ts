import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: `./note-card.html`,
})
export class NoteCard {
  //Input - Ouput
  @Input({ required: true }) note!: any;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() openNote = new EventEmitter<string>();

  maxTags = computed(() => (this.viewMode === 'grid' ? 3 : 6));

  hiddenCount = computed(() => {
    const count = this.note.tags.length - this.maxTags();
    return count > 0 ? count : 0;
  });

  displayedTags = computed(() => {
    return this.note.tags.slice(0, this.maxTags());
  });

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
}
