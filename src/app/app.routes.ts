import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./core/components/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'tasks',
      loadChildren: () => import('./features/tasks/tasks-list.component').then(m => m.TasksListComponent),
      canActivate: [() => import('./core/services/auth.guard').then((m) => m.authGuard)]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' } // Wildcard route for undefined paths
  ];
