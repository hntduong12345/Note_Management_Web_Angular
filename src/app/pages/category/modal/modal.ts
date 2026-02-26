import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: `modal.html`,
})
export class CategoryModal {
  readonly XIcon = X;

  // Declare variables
  cateName = '';
  selectedFile: File | null = null;

  // Events State
  close = output<void>();
  create = output<{ name: string; icon: File | null }>();

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    if (this.cateName.trim()) {
      this.create.emit({ name: this.cateName, icon: this.selectedFile });
    }
  }
}
