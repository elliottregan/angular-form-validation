import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { DayForm } from '../models/schedule-form.model';

/**
 * Group validator that prevents open and close times from being identical.
 *
 * Applied to: FormGroup containing 'open' and 'closed' controls
 * Triggers when: Both fields have values and they are the same
 * Returns: { sameTime: { message: string } } when invalid, null when valid
 *
 * Use case: Prevents nonsensical schedules like "9:00 AM - 9:00 AM"
 */
/**
 * Internal typed validator function - not exported directly
 */
function sameOpenCloseValidatorTyped(
  control: FormGroup<DayForm>
): ValidationErrors | null {
  const message = 'Open and close times cannot be the same';

  // Extract values from the child form controls
  // Using typed .controls property - TypeScript guarantees these controls exist
  const open = control.controls.open.value;
  const closed = control.controls.closed.value;

  // Only validate if both fields have values (empty strings are still possible)
  if (open && closed && open === closed) {
    return { sameTime: { message } };
  }

  // Return null when validation passes
  return null;
}

/**
 * Exported validator function that conforms to Angular's ValidatorFn interface
 * while providing type safety internally
 */
export function sameOpenCloseValidator(
  control: AbstractControl
): ValidationErrors | null {
  return sameOpenCloseValidatorTyped(control as FormGroup<DayForm>);
}

/**
 * Group validator that ensures closing time is after opening time.
 *
 * Applied to: FormGroup containing 'open' and 'closed' controls
 * Triggers when: Both fields have values and close time is not after open time
 * Returns: { closeBeforeOpen: { message: string } } when invalid, null when valid
 *
 * Implementation: Uses Date objects with a fixed date (2000-01-01) to compare times
 * Use case: Prevents invalid schedules like "5:00 PM - 9:00 AM"
 */
/**
 * Internal typed validator function - not exported directly
 */
function closeAfterOpenValidatorTyped(
  control: FormGroup<DayForm>
): ValidationErrors | null {
  const message = 'Close time must be after open time';

  // Extract values from the child form controls
  // Using typed .controls property - TypeScript guarantees these controls exist
  const open = control.controls.open.value;
  const closed = control.controls.closed.value;

  // Only validate if both fields have values (empty strings are still possible)
  if (open && closed) {
    // Convert time strings to Date objects for comparison
    // Using fixed date (2000-01-01) since we only care about time comparison
    const openTime = new Date(`2000-01-01T${open}:00`);
    const closedTime = new Date(`2000-01-01T${closed}:00`);

    // Validation fails if close time is not after open time
    if (closedTime <= openTime) {
      return { closeBeforeOpen: { message } };
    }
  }

  // Return null when validation passes
  return null;
}

/**
 * Exported validator function that conforms to Angular's ValidatorFn interface
 * while providing type safety internally
 */
export function closeAfterOpenValidator(
  control: AbstractControl
): ValidationErrors | null {
  return closeAfterOpenValidatorTyped(control as FormGroup<DayForm>);
}

/**
 * Group validator that conditionally requires open/close times based on enabled state.
 *
 * Applied to: FormGroup containing 'enabled', 'open', and 'closed' controls
 * Triggers when: Day is enabled AND both time fields have been touched AND either field is empty
 * Returns: { requiredWhenEnabled: { message: string } } when invalid, null when valid
 *
 * Key behavior: Only validates after user interaction (touched state) to avoid premature errors
 * Use case: Makes time fields required only when the day is enabled, not when disabled
 *
 * Note: Group validators don't re-run on touched state changes, only on value changes.
 * This means the validation may not update immediately when fields lose focus.
 */
/**
 * Internal typed validator function - not exported directly
 */
function requiredWhenEnabledTyped(
  control: FormGroup<DayForm>
): ValidationErrors | null {
  // Extract the enabled checkbox value
  // Using typed .controls property - TypeScript guarantees these controls exist
  const enabled = control.controls.enabled.value;

  // Get references to the time input controls to check both value and touched state
  // TypeScript guarantees these controls exist through the typed interface
  const openControl = control.controls.open;
  const closedControl = control.controls.closed;

  // Extract values and touched states (values are guaranteed non-null, but can be empty strings)
  const open = openControl.value;
  const closed = closedControl.value;
  const openTouched = openControl.touched;
  const closedTouched = closedControl.touched;

  // Only validate when:
  // 1. Day is enabled (checkbox checked)
  // 2. Both time fields have been touched (user has interacted with them)
  if (enabled && openTouched && closedTouched) {
    // Require both fields to have values (check for empty strings)
    if (!open || !closed) {
      const message = 'Opening and closing times are required when enabled';
      return { requiredWhenEnabled: { message } };
    }
  }

  // Return null when validation passes or conditions aren't met
  return null;
}

/**
 * Exported validator function that conforms to Angular's ValidatorFn interface
 * while providing type safety internally
 */
export function requiredWhenEnabled(
  control: AbstractControl
): ValidationErrors | null {
  return requiredWhenEnabledTyped(control as FormGroup<DayForm>);
}
