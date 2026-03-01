import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, Trash2, Loader, Folder } from 'lucide-angular';
import { CategoryModal } from './modal/modal';

import { CategoryService } from '../../services/category.service';
import { CategoryRequest, CategoryResponse } from '../../dtos/category.dto';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CategoryModal],
  templateUrl: `category.html`,
})
export class Category implements OnInit {
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash2;
  readonly LoadingIcon = Loader;
  readonly FolderIcon = Folder;
  readonly defaultIcon = 'assets/default_object.png';

  private categoryService = inject(CategoryService);

  showModal = signal(false);
  isUploading = signal(false);
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

  handleCreateCategory(data: { name: string; icon: File | null }): void {
    if (!data.name.trim()) return;
    this.isUploading.set(true);

    // Temporary add icon string value to empty string
    const placeholderIcon = '';

    const request: CategoryRequest = {
      name: data.name,
      iconIdentifier: data.icon as File, // Cast null to File or adjust interface to 'File | null'
    };

    this.categoryService.createCategory(request).subscribe({
      next: (newCategory) => {
        // Update categories data
        this.categories.update((prev) => [newCategory, ...prev]);
        this.isUploading.set(false);
        this.showModal.set(false);
      },
      error: (err) => {
        console.error('Upload to Cloudinary / DB Save failed:', err);
        this.isUploading.set(false);
      },
    });
  }

  // Add handle update category

  handleDeleteCategory(category: CategoryResponse): void {
    // Change to notice modals for better UI
    const confirmDelete = confirm(`Are you sure to delete category ${category.name}?`);

    if (confirmDelete) {
      this.categoryService.deleteCategory(category.id).subscribe({
        next: () => {
          this.categories.update((cate) => cate.filter((c) => c.id !== category.id));
        },
        error: (err) => {
          console.log('Delete failed!', err);
        },
      });
    }
  }

  // Helpers
  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
}
