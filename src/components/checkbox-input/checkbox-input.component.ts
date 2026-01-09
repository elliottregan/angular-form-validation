import { Component, Input, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextCheckboxId = 0;

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInputComponent),
      multi: true,
    },
  ],
})
export class CheckboxInputComponent implements ControlValueAccessor {
  @Input() label: string = '';

  inputId: string = `checkbox-input-${nextCheckboxId++}`;
  value: boolean = false;
  disabled: boolean = false;

  private onChangeCallback = (value: boolean) => {};
  onTouched = () => {};

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.checked;
    this.onChangeCallback(this.value);
  }

  writeValue(value: boolean): void {
    this.value = value || false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
