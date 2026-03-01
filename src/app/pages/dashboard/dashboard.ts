import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Search, Plus, LayoutGrid, List } from 'lucide-angular';
import { NoteCard } from '../../components/note-card/note-card';
import { NoteService } from '../../services/note.service';
import { NoteResponse } from '../../dtos/note.dto';
import { Subject, debounceTime, distinctUntilChanged, switchMap, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteCard, LucideAngularModule],
  templateUrl: `dashboard.html`,
})
export class Dashboard {
  private router = inject(Router);
  private noteService = inject(NoteService);

  // Icons Declare
  readonly SearchIcon = Search;
  readonly PlusIcon = Plus;
  readonly GridIcon = LayoutGrid;
  readonly ListIcon = List;

  // State Signals
  // notes = signal<any[]>([
  //   {
  //     id: 1,
  //     title: 'React Router Navigation',
  //     content: 'How to use useNavigate instead of router.push in React apps.',
  //     category: 'Frontend',
  //     updatedAt: new Date(),
  //     tags: [{ name: 'react' }, { name: 'routing' }],
  //   },
  //   // ... add your other mock notes here
  // ]);

  notes = signal<NoteResponse[]>([]);
  isLoading = signal(false);
  viewMode = signal<'grid' | 'list'>('grid');

  // Search Stream
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit(): void {
    this.setupSearchSubscription();
    // Init trigger the search none -> get all
    this.searchSubject.next('');
  }

  // Clean up subscription
  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  private setupSearchSubscription() {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(400), // Wait 400ms after user stops typing
        distinctUntilChanged(), // Don't trigger when the value is not changed from previous one
        tap(() => this.isLoading.set(true)),
        switchMap((term: string) => this.noteService.searchNotes(term, 0, 20)),
      )
      .subscribe({
        next: (response) => {
          this.notes.set(response.content);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Search Stream Error:', err);
          this.isLoading.set(false);
          this.setupSearchSubscription();
        },
      });
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  navigateNewNote() {
    this.router.navigate(['/notes']);
  }
}
