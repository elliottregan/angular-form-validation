import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';

interface ThemeOption {
  name: string;
  hue: number;
  color: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { name: 'Blue', hue: 240, color: 'oklch(65% 0.15 240)' },
  { name: 'Purple', hue: 280, color: 'oklch(65% 0.15 280)' },
  { name: 'Green', hue: 160, color: 'oklch(65% 0.15 160)' },
  { name: 'Orange', hue: 50, color: 'oklch(65% 0.15 50)' },
  { name: 'Red', hue: 25, color: 'oklch(65% 0.15 25)' },
  { name: 'Brown', hue: 80, color: 'oklch(45% 0.15 80)' },
  { name: 'Teal', hue: 200, color: 'oklch(65% 0.15 200)' },
];

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent implements OnInit {
  themeOptions = THEME_OPTIONS;
  currentHue = 240; // Default blue

  ngOnInit(): void {
    // Load saved theme on init
    const savedHue = localStorage.getItem('accent-hue');
    if (savedHue) {
      this.changeTheme(parseInt(savedHue, 10));
    }
  }

  changeTheme(hue: number): void {
    // Update CSS custom property
    document.documentElement.style.setProperty('--accent-hue', hue.toString());
    this.currentHue = hue;

    // Save to localStorage for persistence
    localStorage.setItem('accent-hue', hue.toString());
  }

  getThemeOptionName(hue: number): string {
    const option = this.themeOptions.find(opt => opt.hue === hue);
    return option ? option.name : 'Blue';
  }
}
