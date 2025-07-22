import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { DAYS_OF_WEEK } from '../../constants/schedule.constants';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.scss',
})
export class ErrorBannerComponent {
  @Input() form!: FormGroup;

  get daysFormGroup(): FormGroup {
    return this.form.get('days') as FormGroup;
  }

  get formErrors(): string[] {
    if (!this.form) {
      return [];
    }

    const errors: string[] = [];

    DAYS_OF_WEEK.forEach(dayName => {
      const dayGroup = this.daysFormGroup.get(dayName) as FormGroup;

      // Check individual field errors (only if touched)
      const openControl = dayGroup.get('open');
      const closedControl = dayGroup.get('closed');

      if (openControl?.hasError('required') && openControl?.touched) {
        errors.push(`${dayName}: Opening time is required`);
      }

      if (closedControl?.hasError('required') && closedControl?.touched) {
        errors.push(`${dayName}: Closing time is required`);
      }

      // Check group-level validation errors (only if group is touched)
      if (dayGroup.touched) {
        if (dayGroup.hasError('sameTime')) {
          errors.push(
            `${dayName}: Opening and closing times cannot be the same`
          );
        }

        if (dayGroup.hasError('closeBeforeOpen')) {
          errors.push(`${dayName}: Closing time must be after opening time`);
        }
      }
    });

    return errors;
  }
}
