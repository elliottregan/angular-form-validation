import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { DebugTableComponent } from '../debug-table/debug-table.component';
import { FormStatsComponent } from '../form-stats/form-stats.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-debug-section',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    DebugTableComponent,
    FormStatsComponent,
  ],
  templateUrl: './debug-section.component.html',
})
export class DebugSectionComponent {
  @Input() form!: FormGroup;
}
