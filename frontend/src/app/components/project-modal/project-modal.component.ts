import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

export interface ProjectForModal {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  status: string;
  image: string;
  githubUrl: string;
  functionalities: string[];
  role: string;
  team: string[];
  date: string;
}

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectModalComponent {
  @Input() project: ProjectForModal | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClose(): void {
    this.close.emit();
  }

  navigateToContact(): void {
    this.onClose();
    this.router.navigate(['/contacto'], { fragment: 'formulario-contacto' });
  }

  openGithub(): void {
    if (this.project?.githubUrl) {
      window.open(this.project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler(): void {
    if (this.isOpen) {
      this.onClose();
    }
  }
}
