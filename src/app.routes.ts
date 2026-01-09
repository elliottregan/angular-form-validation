import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/schedule/schedule.page').then(m => m.SchedulePage),
  },
  {
    path: 'resource-demo',
    loadComponent: () =>
      import('./pages/resource-demo/resource-demo.page').then(
        m => m.ResourceDemoPage
      ),
  },
];
