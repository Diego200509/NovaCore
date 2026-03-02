import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ScrollService } from '../../shared/services/scroll.service';

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

  constructor(private router: Router, private scrollService: ScrollService) {}

  onClose() {
    this.close.emit();
  }

  navigateToContact() {
    this.onClose();
    
    const scrollFn = () => {
        setTimeout(() => this.scrollService.scrollToSection('contacto'), 400);
    };

    if (this.router.url !== '/' && this.router.url.split('#')[0] !== '/') {
        this.router.navigate(['/']).then(() => scrollFn());
    } else {
        scrollFn();
    }
  }

  // Close modal when clicking escape
  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    if (this.isOpen) {
      this.onClose();
    }
  }
}
