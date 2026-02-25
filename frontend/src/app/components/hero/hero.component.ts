import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  constructor(private scrollService: ScrollService) {}

  scrollToContact(): void {
    this.scrollService.scrollToSection('contacto');
  }
}
