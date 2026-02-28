import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/layout').then((m) => m.Layout),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'notes',
        loadComponent: () => import('./pages/note-editor/note-editor').then((m) => m.NoteEditor),
      },
      {
        path: 'notes/:id',
        loadComponent: () => import('./pages/note-editor/note-editor').then((m) => m.NoteEditor),
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/category/category').then((m) => m.Category),
      },
      {
        path: 'trash',
        loadComponent: () => import('./pages/trash/trash').then((m) => m.Trash),
      },
    ],
  },
];
