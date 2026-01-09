import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ReactiveFormsModule,
  Validator,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TimeInputComponent } from '../time-input/time-input.component';
import { CheckboxInputComponent } from '../checkbox-input/checkbox-input.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { EnableWhenDirective } from '../../directives/enable-when.directive';
import {
  closeAfterOpenValidator,
  requiredWhenEnabled,
  sameOpenCloseValidator,
} from '../../validators/schedule-validators';
import { DAYS_OF_WEEK } from '../../constants/schedule.constants';
import { DaysForm, DayForm } from '../../models/schedule-form.model';
import { CardComponent } from '../card/card.component';

/**
 * Days form group component following Single Responsibility Principle.
 *
 * This component has one primary responsibility:
 * - Days Form Group Management - Creates and manages the collection of day schedule controls
 *
 * What this component DOES:
 * - Creates typed FormGroup for all days of the week
 * - Configures individual day validators and form structure
 * - Renders the days grid layout with form controls
 * - Implements ControlValueAccessor for seamless integration with parent forms
 * - Manages the complex form structure logic (Object.fromEntries with day mapping)
 *
 * What this component DOES NOT do (delegated to other components):
 * - Form submission handling (parent ScheduleFormComponent)
 * - Individual form control rendering (TimeInputComponent, CheckboxInputComponent)
 * - Error message display (ErrorMessageComponent)
 * - Conditional enabling/disabling logic (EnableWhenDirective)
 * - Validation logic implementation (schedule-validators.ts)
 *
 * This separation allows the main form to focus purely on orchestration and submission,
 * while this component handles the complex days collection logic.
 */
@Component({
  selector: 'app-days-form-group',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TimeInputComponent,
    CheckboxInputComponent,
    ErrorMessageComponent,
    EnableWhenDirective,
    CardComponent,
  ],
  templateUrl: './days-form-group.component.html',
  styleUrl: './days-form-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DaysFormGroupComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DaysFormGroupComponent),
      multi: true,
    },
  ],
})
export class DaysFormGroupComponent implements ControlValueAccessor, Validator {
  /** Expose the internal form group for debugging purposes */
  public get internalFormGroup() {
    return this.daysFormGroup;
  }
  /** Array of day names used for template iteration and form structure */
  daysOfWeek = DAYS_OF_WEEK;

  /**
   * Typed FormGroup containing all day schedule controls.
   * Each day has: enabled (checkbox), open (time), closed (time).
   * Uses Object.fromEntries to dynamically create controls for each day in DAYS_OF_WEEK.
   *
   * Note: All controls use nonNullable: true for several benefits:
   * - Eliminates optional chaining (?.) throughout validators and components
   * - Better TypeScript IntelliSense and autocomplete (no null/undefined checks)
   * - Cleaner code without unnecessary null safety checks
   * - Values are guaranteed to be the expected type (boolean/string) never null
   * - Empty strings are still possible and handled by validation logic
   */
  daysFormGroup = new FormGroup<DaysForm>(
    Object.fromEntries(
      DAYS_OF_WEEK.map(day => [
        day,
        new FormGroup<DayForm>(
          {
            /** Checkbox to enable/disable the day's schedule */
            enabled: new FormControl(false, { nonNullable: true }),
            /** Opening time input with required validation */
            open: new FormControl('', {
              nonNullable: true,
              validators: [Validators.required],
            }),
            /** Closing time input with required validation */
            closed: new FormControl('', {
              nonNullable: true,
              validators: [Validators.required],
            }),
          },
          {
            /** Group-level validators that validate across multiple fields */
            validators: [
              requiredWhenEnabled, // Requires open/close times only when enabled and touched
              sameOpenCloseValidator, // Prevents open and close times from being identical
              closeAfterOpenValidator, // Ensures close time is after open time
            ],
          }
        ),
      ])
    )
  );

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      this.daysFormGroup.patchValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.daysFormGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.daysFormGroup.disable();
    } else {
      this.daysFormGroup.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.daysFormGroup.valid ? null : { daysInvalid: true };
  }

  /**
   * Enables all days by setting their 'enabled' checkbox to true.
   * This is a bulk operation for convenience.
   */
  enableAllDays(): void {
    for (const day of this.daysOfWeek) {
      const dayGroup = this.daysFormGroup.get(day);
      if (dayGroup) {
        dayGroup.get('enabled')?.setValue(true);
      }
    }
  }

  /**
   * Disables all days by setting their 'enabled' checkbox to false.
   * This is a bulk operation for convenience.
   */
  disableAllDays(): void {
    for (const day of this.daysOfWeek) {
      const dayGroup = this.daysFormGroup.get(day);
      if (dayGroup) {
        dayGroup.get('enabled')?.setValue(false);
      }
    }
  }

  /**
   * Resets all days to their initial state.
   * Clears all time values and unchecks all enabled checkboxes.
   */
  resetAllDays(): void {
    for (const day of this.daysOfWeek) {
      const dayGroup = this.daysFormGroup.get(day);
      if (dayGroup) {
        dayGroup.reset({
          enabled: false,
          open: '',
          closed: '',
        });
      }
    }
  }
}
