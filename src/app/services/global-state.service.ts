import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  // Setup for global theme and sidebar state
  // theme = signal<'light' | 'dark'>('light');
  // sidebarOpen = signal(true);
  // toggleTheme() {
  //   this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  // }
}
