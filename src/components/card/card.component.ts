import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() shadow: boolean = false;
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 2;
}