import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DAYS_OF_WEEK } from '../../constants/schedule.constants';

@Component({
  selector: 'app-debug-table',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./debug-table.component.scss'],
  template: `
    <div class="debug-table">
      <table class="debug-table__table">
        <thead>
          <tr>
            <th class="debug-table__header">Day</th>
            <th class="debug-table__header">Group Valid</th>
            <th class="debug-table__header">Group Errors</th>
            <th class="debug-table__header">Open Time</th>
            <th class="debug-table__header">Open Valid</th>
            <th class="debug-table__header">Open Errors</th>
            <th class="debug-table__header">Close Time</th>
            <th class="debug-table__header">Close Valid</th>
            <th class="debug-table__header">Close Errors</th>
          </tr>
        </thead>
        <tbody>
          @for (dayControl of dayControls; track $index) {
            <tr class="debug-table__row">
              <td class="debug-table__cell debug-table__cell--day">
                {{ DAYS_OF_WEEK[$index] }}
              </td>
              <td class="debug-table__cell">
                <span
                  class="status"
                  [class.status--valid]="dayControl.valid"
                  [class.status--invalid]="!dayControl.valid"
                >
                  {{ dayControl.valid ? 'Valid' : 'Invalid' }}
                </span>
              </td>
              <td class="debug-table__cell">
                <span
                  class="message"
                  [class.message--error]="getError(dayControl)"
                >
                  {{ getError(dayControl) || 'None' }}
                </span>
              </td>
              <td class="debug-table__cell">
                {{ dayControl.get('open')?.value || '--:--' }}
              </td>
              <td class="debug-table__cell">
                <span
                  class="status"
                  [class.status--valid]="dayControl.get('open')?.valid"
                  [class.status--invalid]="!dayControl.get('open')?.valid"
                >
                  {{ dayControl.get('open')?.valid ? 'Valid' : 'Invalid' }}
                </span>
              </td>
              <td class="debug-table__cell">
                <span
                  class="message"
                  [class.message--error]="getError(dayControl.get('open'))"
                >
                  {{ getError(dayControl.get('open')) || 'None' }}
                </span>
              </td>
              <td class="debug-table__cell">
                {{ dayControl.get('closed')?.value || '--:--' }}
              </td>
              <td class="debug-table__cell">
                <span
                  class="status"
                  [class.status--invalid]="!dayControl.get('closed')?.valid"
                >
                  {{ dayControl.get('closed')?.valid ? 'Valid' : 'Invalid' }}
                </span>
              </td>
              <td class="debug-table__cell">
                <span
                  class="message"
                  [class.message--error]="getError(dayControl.get('closed'))"
                >
                  {{ getError(dayControl.get('closed')) || 'None' }}
                </span>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class DebugTableComponent {
  @Input() form!: FormGroup;

  DAYS_OF_WEEK = DAYS_OF_WEEK;

  get dayControls(): AbstractControl[] {
    if (!this.form) return [];
    return DAYS_OF_WEEK.map(day => this.form.get(day)!);
  }

  getError(control: any): string {
    if (control && control.errors && control.touched) {
      const firstErrorKey = Object.keys(control.errors)[0];
      const error = control.errors[firstErrorKey];

      // Handle built-in validators
      if (firstErrorKey === 'required') {
        return 'This field is required';
      }

      // Handle custom validators with messages
      return error.message || 'Invalid value';
    }

    return '';
  }
}
