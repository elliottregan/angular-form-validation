import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-stats.component.html',
  styleUrl: './form-stats.component.scss',
})
export class FormStatsComponent {
  @Input() form!: FormGroup;

  getFormDebugObject(): any {
    return {
      valid: this.form.valid,
      invalid: this.form.invalid,
      pending: this.form.pending,
      touched: this.form.touched,
      dirty: this.form.dirty,
      errors: this.form.errors,
    };
  }
}
