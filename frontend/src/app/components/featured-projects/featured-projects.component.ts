import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: 'completado' | 'en-progreso' | 'planificado';
  image: string;
  githubUrl: string;
}

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent {
  // Los 3 proyectos más importantes
  featuredProjects: Project[] = [
    {
      id: 1,
      title: 'Proyecto Final Web',
      description: 'Plataforma web full stack para gestión de reservas hoteleras con panel administrativo y autenticación basada en roles.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript'],
      status: 'completado',
      image: '/img/Web.png',
      githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Web'
    },
    {
      id: 2,
      title: 'Proyecto Final Distribuidas',
      description: 'Marketplace digital con arquitectura de microservicios, incluyendo sistema de pagos integrado y gateway API.',
      technologies: ['C#', '.NET Core', 'JavaScript', 'React', 'Docker'],
      status: 'en-progreso',
      image: '/img/Distribuidas.png',
      githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas'
    },
    {
      id: 3,
      title: 'Proyecto GPIS',
      description: 'Sistema de gestión e información con arquitectura escalable y base de datos optimizada para grandes volúmenes de datos.',
      technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'React', 'AWS'],
      status: 'completado',
      image: '/img/GPIS.png',
      githubUrl: 'https://github.com/ArielParedesLozada/ProyectoGPIS'
    }
  ];

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'completado':
        return 'badge-completed';
      case 'en-progreso':
        return 'badge-progress';
      case 'planificado':
        return 'badge-planned';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completado':
        return 'Completado';
      case 'en-progreso':
        return 'En Progreso';
      case 'planificado':
        return 'Planificado';
      default:
        return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completado':
        return 'fa-check';
      case 'en-progreso':
        return 'fa-clock';
      case 'planificado':
        return 'fa-calendar';
      default:
        return '';
    }
  }
}

