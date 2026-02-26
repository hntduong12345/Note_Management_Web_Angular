import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('note-management-hub');
}
