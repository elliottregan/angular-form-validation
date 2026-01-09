import { Component, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { LayoutComponent } from './components/layout/layout.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent,
    PageHeaderComponent,
    ScheduleFormComponent,
    ThemeSwitcherComponent,
  ],
  template: `
    <app-layout>
      <app-theme-switcher
        style="display: block; margin-bottom: var(--spacing-lg)"
      ></app-theme-switcher>
      <app-page-header
        title="Weekly Schedule Form"
        description="Set your business hours for each day of the week"
      >
      </app-page-header>

      <app-schedule-form></app-schedule-form>
    </app-layout>
  `,
})
export class App {}

bootstrapApplication(App, { providers: [provideZoneChangeDetection()] });
