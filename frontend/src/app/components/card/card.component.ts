import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() imageUrl?: string;
  @Input() imageAlt: string = '';
  @Input() title?: string;
  @Input() description?: string;
  @Input() price?: string;
  @Input() buttonText?: string;
  @Input() buttonLink?: string;
  @Input() showButton: boolean = false;
  /** Autores (opcional; se muestra como "Por: A, B, C"). */
  @Input() authors: string[] = [];
  @Input() priority: boolean = false;
}


