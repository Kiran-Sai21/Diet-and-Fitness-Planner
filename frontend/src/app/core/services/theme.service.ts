import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = false;

  constructor() {
    const saved = localStorage.getItem('theme');
    this.darkMode = saved === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
  }
}
