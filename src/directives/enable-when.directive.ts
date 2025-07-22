import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[enableWhen]',
  standalone: true,
})
export class EnableWhenDirective implements OnInit, OnDestroy {
  @Input() enableWhen!: AbstractControl;

  private subscription?: Subscription;

  constructor(@Optional() @Self() private ngControl: NgControl) {}

  ngOnInit(): void {
    if (!this.enableWhen) {
      console.warn('EnableWhenDirective: enableWhen input is required');
      return;
    }

    if (!this.ngControl?.control) {
      console.warn(
        'EnableWhenDirective: Could not find form control. Make sure this directive is used on a form control.'
      );
      return;
    }

    // Set initial state
    this.updateControlState(this.enableWhen.value);

    // Subscribe to changes
    this.subscription = this.enableWhen.valueChanges.subscribe(value => {
      this.updateControlState(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateControlState(enabled: boolean): void {
    if (!this.ngControl?.control) return;

    if (enabled) {
      this.ngControl.control.enable();
    } else {
      this.ngControl.control.disable();
    }
  }
}
