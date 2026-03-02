import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  extendedInfo: string[];
  technologies?: string[];
}

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-services.component.html',
  styleUrl: './featured-services.component.scss'
})
export class FeaturedServicesComponent {
  // Los 3 servicios más importantes
  featuredServices: ServiceItem[] = [
    {
      id: 'web-dev',
      title: 'Desarrollo Web Integrado',
      description: 'Creamos plataformas web modernas, rápidas y escalables con las últimas tecnologías.',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Desarrollo Web',
      extendedInfo: [
        'Desarrollamos plataformas de alto rendimiento centradas en la escalabilidad y seguridad de tu negocio.'
      ],
      technologies: [
        'React / Angular / Vue',
        'APIs RESTful & GraphQL',
        'Bases de Datos Escalables',
        'Performance Web Vitals'
      ]
    },
    {
      id: 'ui-ux',
      title: 'Diseño UX/UI Premium',
      description: 'Interfaces intuitivas y atractivas que capturan la atención y mejoran la conversión.',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Diseño UI/UX',
      extendedInfo: [
        'Nuestras interfaces nacen de una investigación de usuario profunda combinada con sistemas de diseño de nivel mundial.'
      ],
      technologies: [
        'Figma / Adobe XD',
        'Sistemas de Diseño',
        'Investigación de Usuarios',
        'Prototipado Interactivo'
      ]
    },
    {
      id: 'ai-solutions',
      title: 'Soluciones con Inteligencia Artificial',
      description: 'Automatiza procesos y toma decisiones basadas en datos utilizando modelos de IA generativa y Machine Learning.',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Inteligencia Artificial',
      extendedInfo: [
        'Volvemos a tu negocio dramáticamente competitivo y veloz inyectando IA generativa.'
      ],
      technologies: [
        'Modelos LLM (GPT, Gemini)',
        'Machine Learning',
        'Agentes Autónomos',
        'Análisis Predictivo'
      ]
    }
  ];

  getServiceIcon(id: string): string {
    const icons: { [key: string]: string } = {
      'web-dev': 'fa-code',
      'ui-ux': 'fa-palette',
      'ai-solutions': 'fa-brain'
    };
    return icons[id] || 'fa-star';
  }
}

