import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'notices',
    loadComponent: () => import('./pages/notices-page/notices-page.component').then((m) => m.NoticesPageComponent),
  },
  {
    path: 'reminders',
    loadComponent: () =>
      import('./pages/reminders-page/reminders-page.component').then((m) => m.RemindersPageComponent),
  },
  {
    path: 'tags',
    loadComponent: () => import('./pages/tags-page/tags-page.component').then((m) => m.TagsPageComponent),
  },
  {
    path: '',
    redirectTo: 'notices',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'notices',
  },
];
