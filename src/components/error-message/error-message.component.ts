import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl;

  getError(): string {
    if (this.control && this.control.errors && this.control.touched) {
      const firstErrorKey = Object.keys(this.control.errors)[0];
      const error = this.control.errors[firstErrorKey];

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
