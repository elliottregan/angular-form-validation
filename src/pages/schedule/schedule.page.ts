import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [PageHeaderComponent, ScheduleFormComponent],
  template: `
    <app-page-header
      title="Weekly Schedule Form"
      description="Set your business hours for each day of the week"
    >
    </app-page-header>
    <app-schedule-form></app-schedule-form>
  `,
})
export class SchedulePage {}
