import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor() { }

  scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 90; // 90px para la altura de la navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 0);
  }
}
