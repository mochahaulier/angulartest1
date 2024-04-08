import { Component, OnInit, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-select',
  standalone: true,
  imports: [],
  templateUrl: './theme-select.component.html',
  styleUrl: './theme-select.component.scss'
})
export class ThemeSelectComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}