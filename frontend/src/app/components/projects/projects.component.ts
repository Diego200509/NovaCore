import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  status: 'completado' | 'en-progreso' | 'planificado';
  image: string;
  githubUrl: string;
  functionalities: string[];
  role: string;
  team: string[];
  date: string;
  expanded: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  selectedFilter = signal<string>('todos');
  expandedProject = signal<number | null>(null);

  projects: Project[] = [
    {
      id: 1,
      title: 'Proyecto Final Web',
      description: 'Plataforma web full stack para gestión de reservas hoteleras con panel administrativo y autenticación basada en roles.',
      fullDescription: 'Sistema completo de gestión hotelera desarrollado con Laravel y tecnologías modernas. Incluye sistema de reservas en tiempo real, panel administrativo completo y autenticación OAuth con Google.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript'],
      status: 'completado',
      image: '/img/proyecto-web.jpg',
      githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Web',
      functionalities: [
        'Sistema de reservas con validación de disponibilidad en tiempo real',
        'Autenticación y autorización basada en roles (Admin / Usuario)',
        'Dashboard administrativo para gestión de habitaciones y reservas',
        'Integración completa frontend-backend usando arquitectura MVC'
      ],
      role: 'Desarrollo Full Stack',
      team: ['Ariel Paredes', 'Equipo de desarrollo'],
      date: 'Septiembre - Diciembre 2025',
      expanded: false
    },
    {
      id: 2,
      title: 'Proyecto Final Distribuidas',
      description: 'Marketplace digital con arquitectura de microservicios, incluyendo sistema de pagos integrado y gateway API.',
      fullDescription: 'Aplicación distribuida con microservicios desarrollada en .NET Core. Incluye servicio de autenticación, servicio de choferes, gateway API y frontend en React/Next.js con despliegue en la nube.',
      technologies: ['C#', '.NET Core', 'JavaScript', 'React', 'Docker'],
      status: 'en-progreso',
      image: '/img/proyecto-distribuidas.jpg',
      githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas',
      functionalities: [
        'Arquitectura de microservicios con comunicación asíncrona',
        'Gateway API para enrutamiento y balanceo de carga',
        'Sistema de autenticación distribuido',
        'Frontend cloud-native con despliegue automatizado'
      ],
      role: 'Desarrollo Backend y Arquitectura',
      team: ['Ariel Paredes', 'Equipo de desarrollo'],
      date: 'Enero - Mayo 2025',
      expanded: false
    },
    {
      id: 3,
      title: 'Proyecto GPIS',
      description: 'Sistema de gestión e información con arquitectura escalable y base de datos optimizada para grandes volúmenes de datos.',
      fullDescription: 'Sistema integral de gestión desarrollado para optimizar procesos empresariales. Incluye módulos de reportes, análisis de datos y dashboard interactivo.',
      technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'React', 'AWS'],
      status: 'completado',
      image: '/img/proyecto-gpis.jpg',
      githubUrl: 'https://github.com/ArielParedesLozada/ProyectoGPIS',
      functionalities: [
        'Sistema de gestión de información empresarial',
        'Reportes y análisis de datos en tiempo real',
        'Dashboard interactivo con visualizaciones',
        'API RESTful con documentación completa'
      ],
      role: 'Desarrollo Full Stack',
      team: ['Ariel Paredes', 'Equipo de desarrollo'],
      date: 'Marzo - Junio 2025',
      expanded: false
    }
  ];

  filteredProjects = signal<Project[]>(this.projects);

  constructor() {
    this.updateFilteredProjects();
  }

  setFilter(filter: string): void {
    this.selectedFilter.set(filter);
    this.updateFilteredProjects();
  }

  updateFilteredProjects(): void {
    const filter = this.selectedFilter();
    if (filter === 'todos') {
      this.filteredProjects.set(this.projects);
    } else {
      this.filteredProjects.set(
        this.projects.filter(p => p.status === filter)
      );
    }
  }

  toggleExpand(projectId: number): void {
    if (this.expandedProject() === projectId) {
      this.expandedProject.set(null);
    } else {
      this.expandedProject.set(projectId);
    }
  }

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

