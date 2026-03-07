import { Injectable } from '@angular/core';

const NAV_OFFSET = 90;

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor() { }

  private scrollToElement(element: HTMLElement): void {
    const offsetTop = element.offsetTop - NAV_OFFSET;
    window.scrollTo({
      top: Math.max(0, offsetTop),
      behavior: 'smooth'
    });
  }

  scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        this.scrollToElement(element);
      }
    }, 0);
  }

  /**
   * Espera a que el elemento exista en el DOM (útil tras navegar a otra ruta) y hace scroll.
   * Reintenta cada 150ms hasta 3 segundos.
   */
  scrollToSectionWhenReady(sectionId: string): void {
    const maxAttempts = 20;
    let attempts = 0;

    const tryScroll = () => {
      attempts++;
      const element = document.getElementById(sectionId);
      if (element) {
        this.scrollToElement(element);
        return;
      }
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 150);
      }
    };

    setTimeout(tryScroll, 200);
  }
}
