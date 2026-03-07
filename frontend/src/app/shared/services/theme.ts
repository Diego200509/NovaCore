import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(true);

  constructor() {
    this.initTheme();

    // Al cambiar la señal, se guarda en localStorage y actualiza la clase del body
    effect(() => {
      const isDark = this.isDarkMode();
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      if (isDark) {
        document.body.classList.remove('light-theme');
        document.documentElement.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.documentElement.classList.add('light-theme');
      }
    });
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
  }
}
