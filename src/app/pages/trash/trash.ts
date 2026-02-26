import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: `trash.html`,
})
export class Trash {
  readonly TrashIcon = Trash2;

  // Declare variable state
  trashedNotes = signal<any[]>([
    {
      id: 'trash_1',
      title: 'React Performance Optimization',
      content:
        'Learn how to optimize React applications using memo, useCallback, useMemo and proper component structure...',
      trashedAt: '2026-02-20',
    },
    {
      id: 'trash_2',
      title: 'DevOps Deployment Checklist',
      content:
        'Steps for deploying production apps: environment variables, CI/CD setup, Docker configuration...',
      trashedAt: '2026-02-18',
    },
    {
      id: 'trash_3',
      title: 'UI Design Inspiration Ideas',
      content:
        'Modern SaaS dashboard inspiration with clean spacing, subtle shadows, soft colors...',
      trashedAt: '2026-02-15',
    },
    {
      id: 'trash_4',
      title: 'Meeting Notes - Project Planning',
      content:
        'Discussed roadmap milestones, feature prioritization, sprint goals, and team responsibilities...',
      trashedAt: '2026-02-10',
    },
  ]);

  ngOnInit(): void {
    // In a real app, you'd subscribe to your NoteService here
  }

  restoreNote(id: string) {
    this.trashedNotes.update((notes) => notes.filter((n) => n.id !== id));
    console.log(`Restoring note: ${id}`);
  }

  deleteForever(id: string) {
    this.trashedNotes.update((notes) => notes.filter((n) => n.id !== id));
    console.log(`Permanently deleting: ${id}`);
  }
}
