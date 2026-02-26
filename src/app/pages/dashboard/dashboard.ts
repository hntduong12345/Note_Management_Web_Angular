import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Search, Plus, LayoutGrid, List } from 'lucide-angular';
import { NoteCard } from '../../components/note-card/note-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteCard, LucideAngularModule],
  templateUrl: `dashboard.html`,
})
export class Dashboard {
  private router = inject(Router);

  // Icons Declare
  readonly SearchIcon = Search;
  readonly PlusIcon = Plus;
  readonly GridIcon = LayoutGrid;
  readonly ListIcon = List;

  // State Signals
  notes = signal<any[]>([
    {
      id: 1,
      title: 'React Router Navigation',
      content: 'How to use useNavigate instead of router.push in React apps.',
      category: 'Frontend',
      updatedAt: new Date(),
      tags: [{ name: 'react' }, { name: 'routing' }],
    },
    // ... add your other mock notes here
  ]);

  search = signal('');
  sortBy = signal('updatedAt');
  viewMode = signal<'grid' | 'list'>('grid');

  // Computed: This replaces React's useMemo()
  filteredNotes = computed(() => {
    const q = this.search().toLowerCase().trim();
    const sortField = this.sortBy() as string;

    let filtered = this.notes();

    if (q) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q) ||
          n.tags.some((t: any) => t.name.toLowerCase().includes(q)),
      );
    }

    return [...filtered].sort((a, b) => {
      if (sortField === 'title') return a.title.localeCompare(b.title);
      return new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
    });
  });

  navigateNewNote() {
    this.router.navigate(['/notes']);
  }
}
