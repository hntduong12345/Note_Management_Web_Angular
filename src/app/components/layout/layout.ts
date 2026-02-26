import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { LucideAngularModule, Loader } from 'lucide-angular';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, LucideAngularModule],
  templateUrl: `layout.html`,
})
export class Layout {
  readonly LoaderIcon = Loader;

  appLoading = signal(true);

  ngOnInit() {
    setTimeout(() => {
      this.appLoading.set(false);
    }, 1000);
  }
}
