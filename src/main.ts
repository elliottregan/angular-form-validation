import { Component, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { NavComponent } from './components/nav/nav.component';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    ThemeSwitcherComponent,
    NavComponent,
  ],
  template: `
    <app-layout>
      <app-theme-switcher
        style="display: block; margin-bottom: var(--spacing-md)"
      ></app-theme-switcher>
      <app-nav></app-nav>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
  ],
});
