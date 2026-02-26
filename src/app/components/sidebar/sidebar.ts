import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  LayoutDashboard,
  FilePlus,
  FolderOpen,
  Trash2,
  BrainCircuit,
  ChevronRight,
} from 'lucide-angular';
// import { AuthService } from '../../services/auth.service'; // Uncomment when ready

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: `./sidebar.html`,
})
export class Sidebar {
  // Icons declare
  readonly BrainCircuit = BrainCircuit;
  readonly ChevronRight = ChevronRight;

  // Mocking the auth state for now (Matches your React useEffect)
  user = {
    isAuthenticated: true,
    email: 'test@gmail.com',
  };

  navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/notes', label: 'Note Editor', icon: FilePlus },
    { href: '/categories', label: 'Categories', icon: FolderOpen },
    { href: '/trash', label: 'Trash', icon: Trash2 },
  ];

  getUserInitials(email: string): string {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  }
}
