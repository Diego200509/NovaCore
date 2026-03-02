import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentThemeSignal = signal<'theme-light' | 'theme-dark'>('theme-light');
  private isScrolledSignal = signal(false);

  currentTheme = this.currentThemeSignal.asReadonly();
  isScrolled = this.isScrolledSignal.asReadonly();

  constructor() {
    this.initializeScrollListener();
    this.initializeTheme();
  }

  private initializeScrollListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.updateScrollState();
      });
    }
  }

  private updateScrollState(): void {
    // Marcar como scrolled ni bien el usuario baja un poco (ej. 50px)
    const isScrolled = window.scrollY > 50;
    this.isScrolledSignal.set(isScrolled);
  }

  private initializeTheme(): void {
    // Por defecto light theme
    // Puedes agregar lógica aquí para detectar preferencias del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentThemeSignal.set(prefersDark ? 'theme-dark' : 'theme-light');
  }

  toggleTheme(): void {
    this.currentThemeSignal.update(current =>
      current === 'theme-light' ? 'theme-dark' : 'theme-light'
    );
  }

  setTheme(theme: 'theme-light' | 'theme-dark'): void {
    this.currentThemeSignal.set(theme);
  }
}
