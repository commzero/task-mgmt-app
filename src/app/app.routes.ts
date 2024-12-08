import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () => import('./core/components/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'tasks',
      loadComponent: () => import('./features/tasks/tasks-dashboard.component').then(m => m.TasksDashboardComponent),
      canActivate: [() => import('./core/services/auth.guard').then((m) => m.authGuard)]
    },
    {
      path: 'add-edit-task',
      loadComponent: () => import('./features/tasks/add-edit-task/add-edit-task.component').then(m => m.AddEditTaskComponent ),
      canActivate: [() => import('./core/services/auth.guard').then((m) => m.authGuard)]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' } // Wildcard route for undefined paths
  ];
