import { FormControl, FormGroup } from '@angular/forms';
import { DAYS_OF_WEEK } from '../constants/schedule.constants';

// Create a union type from DAYS_OF_WEEK values
export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

// Interface for individual day form controls
export interface DayForm {
  enabled: FormControl<boolean>;
  open: FormControl<string>;
  closed: FormControl<string>;
}

// Interface for days collection form controls with strictly typed keys
export type DaysForm = Record<DayOfWeek, FormGroup<DayForm>>;

// Interface for the complete schedule form controls
export interface ScheduleForm {
  days: FormControl<Record<DayOfWeek, DayScheduleValue>>;
}

// Value types (what you get from form.value)
export interface DayScheduleValue {
  enabled: boolean;
  open: string;
  closed: string;
}
