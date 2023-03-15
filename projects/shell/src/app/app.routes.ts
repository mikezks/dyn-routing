import { Routes } from '@angular/router';
import { matchDynamicRoutes } from '@flight42/dyn-routes';
import { HomeComponent } from './core';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  matchDynamicRoutes(),
  {
    path: 'booking',
    loadChildren: () => import('./booking')
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
