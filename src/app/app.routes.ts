import { Routes } from '@angular/router';
//import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/property/pages/property-list/property-list.component')
      .then(m => m.PropertyListComponent)
  },
  {
    path: 'propiedades',
    loadComponent: () => import('./features/property/pages/property-list/property-list.component')
      .then(m => m.PropertyListComponent)
  },
  {
    path: 'propiedades/nueva',
    loadComponent: () => import('./features/property/pages/property-form/property-form.component')
      .then(m => m.PropertyFormComponent),
    //canActivate: [authGuard]
  },
  {
    path: 'propiedades/editar/:id',
    loadComponent: () => import('./features/property/pages/property-form/property-form.component')
      .then(m => m.PropertyFormComponent),
    //canActivate: [authGuard]
  },
  {
    path: 'propiedades/:id',
    loadComponent: () => import('./features/property/pages/property-detail/property-detail.component')
      .then(m => m.PropertyDetailComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register/register.component')
      .then(m => m.RegisterComponent)
  },
  { path: '**', redirectTo: '' }
];
