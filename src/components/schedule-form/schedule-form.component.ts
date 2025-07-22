import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DebugSectionComponent } from '../debug-section/debug-section.component';
import { ErrorBannerComponent } from '../error-banner/error-banner.component';
import { DaysFormGroupComponent } from '../days-form-group/days-form-group.component';
import { ScheduleForm } from '../../models/schedule-form.model';

/**
 * Main schedule form component following Single Responsibility Principle.
 *
 * This component has a single primary responsibility:
 * - Form Orchestration and Submission - Creates the form wrapper and handles submit actions
 *
 * What this component DOES:
 * - Creates the top-level reactive form structure with proper typing
 * - Handles form submission success/failure states
 * - Manages error banner visibility based on form validation results
 * - Orchestrates communication between child components
 *
 * What this component DOES NOT do (delegated to other components):
 * - Days form group management (DaysFormGroupComponent via ControlValueAccessor)
 * - Individual form control rendering (TimeInputComponent, CheckboxInputComponent)
 * - Complex form structure logic (handled by DaysFormGroupComponent)
 * - Error message display logic (ErrorMessageComponent, ErrorBannerComponent)
 * - Form debugging and state visualization (DebugSectionComponent)
 * - Validation logic implementation (schedule-validators.ts)
 *
 * This separation allows the main form to focus purely on orchestration and submission,
 * while complex days collection logic is handled by the dedicated DaysFormGroupComponent.
 */
@Component({
  selector: 'app-schedule-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DebugSectionComponent,
    ErrorBannerComponent,
    DaysFormGroupComponent,
  ],
  styleUrl: './schedule-form.component.scss',
  templateUrl: './schedule-form.component.html',
})
export class ScheduleFormComponent {
  /** Controls visibility of the error banner at the top of the form */
  showErrorBanner = false;

  /**
   * Main form wrapper that contains the days collection.
   * Uses strict typing with ScheduleForm interface.
   * The days FormGroup is now managed by DaysFormGroupComponent.
   */
  scheduleForm = new FormGroup<ScheduleForm>({
    days: new FormControl({}, { nonNullable: true }),
  });

  /**
   * Handles form submission.
   * On success: logs form data and hides error banner.
   * On failure: shows error banner and marks all controls as touched to display validation errors.
   */
  onSubmit() {
    if (this.scheduleForm.valid) {
      const formData = this.scheduleForm.value;
      console.log('Form Data:', formData);
      this.showErrorBanner = false;
      alert('Schedule saved successfully! Check the console for form data.');
    } else {
      this.showErrorBanner = true;
      this.scheduleForm.markAllAsTouched();
    }
  }
}
