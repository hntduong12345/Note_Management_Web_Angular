import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { CategoryModal } from './modal/modal';

import { CategoryService } from '../../services/category.service';
import { CategoryResponse } from '../../dtos/category.dto';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CategoryModal],
  templateUrl: `category.html`,
})
export class Category implements OnInit {
  readonly PlusIcon = Plus;
  readonly defaultIcon = 'assets/default_object.png';
  private categoryService = inject(CategoryService);

  showModal = signal(false);

  // Mock Data
  // categories = signal([
  //   { id: 'cat_frontend', name: 'Frontend', icon: '', color: '#3b82f6' },
  //   { id: 'cat_backend', name: 'Backend', icon: '', color: '#10b981' },
  //   { id: 'cat_ui', name: 'UI / UX', icon: '', color: '#8b5cf6' },
  // ]);
  // mockNotes = signal([
  //   { id: 1, category: 'Frontend' },
  //   { id: 2, category: 'Frontend' },
  //   { id: 3, category: 'Backend' },
  //   { id: 4, category: 'UI / UX' },
  // ]);

  categories = signal<CategoryResponse[]>([]);

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res);
      },
      error: (err) => {
        console.error('Failed to get user categories', err);
      },
    });
  }

  // Helper to get count
  // getNotesCount(categoryName: string) {
  //   return this.mockNotes().filter((n) => n.category === categoryName).length;
  // }

  handleCreateCategory(data: { name: string; icon: File | null }) {
    console.log('Creating Category:', data);
    // Logic to call your service
    this.showModal.set(false);
  }
}
