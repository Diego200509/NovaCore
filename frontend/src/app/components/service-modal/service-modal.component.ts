import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonComponent],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceModalComponent {
  @Input() service: any = null;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClose() {
    this.close.emit();
  }

  navigateToContact() {
    this.onClose();
    this.router.navigate(['/contacto'], { fragment: 'formulario-contacto' });
  }

  // Close modal when clicking escape
  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    if (this.isOpen) {
      this.onClose();
    }
  }
}
