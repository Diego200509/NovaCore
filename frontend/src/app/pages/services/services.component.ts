import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { ServiceModalComponent } from '../../components/service-modal/service-modal.component';

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
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CardComponent, ServiceModalComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      id: 'web-dev',
      title: 'Desarrollo Web Integrado',
      description: 'Creamos plataformas web modernas, rápidas y escalables con las últimas tecnologías.',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Desarrollo Web',
      extendedInfo: [
        'Desarrollamos plataformas de alto rendimiento centradas en la escalabilidad y seguridad de tu negocio. Abarcamos desde la conceptualización arquitectónica web hasta su integración directa vía APIs con sistemas de terceros.'
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
        'Nuestras interfaces nacen de una investigación de usuario profunda combinada con sistemas de diseño de nivel mundial. Construimos wireframes y prototipos interactivos enfocados 100% en disparar tu tasa de conversión y retención.'
      ],
      technologies: [
        'Figma / Adobe XD',
        'Sistemas de Diseño',
        'Investigación de Usuarios',
        'Prototipado Interactivo'
      ]
    },
    {
      id: 'seo',
      title: 'Optimización SEO y Marketing',
      description: 'Posiciona tu marca en los primeros resultados de búsqueda y atrae tráfico de calidad.',
      imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'SEO y Marketing Digital',
      extendedInfo: [
        'Maximizamos la visibilidad de tu negocio con prácticas técnicas líderes. Optimizamos la estructura de tu portal, analizamos palabras clave de alta rentabilidad y escalamos tu autoridad de dominio para lograr crecimiento sostenido.'
      ],
      technologies: [
        'Google Analytics 4',
        'Google Search Console',
        'Auditorías Técnicas',
        'Estrategias Link Building'
      ]
    },
    {
      id: 'mobile-dev',
      title: 'Desarrollo de Apps Móviles',
      description: 'Lleva tu negocio al bolsillo de tus clientes con aplicaciones móviles nativas y multiplataforma.',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Desarrollo Móvil',
      extendedInfo: [
        'Creamos experiencias nativas e híbridas que capitalizan el hardware del dispositivo (GPS, Sensores, Push). Maximizamos tu presencia en el bolsillo de tus clientes asegurando un control riguroso de memoria local y red de datos.'
      ],
      technologies: [
        'Flutter / React Native',
        'iOS Nativo (Swift)',
        'Android Nativo (Kotlin)',
        'Notificaciones Push'
      ]
    },
    {
      id: 'cloud',
      title: 'Arquitectura Cloud & DevOps',
      description: 'Infraestructura robusta, segura y escalable alojada en la nube para garantizar alta disponibilidad.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Cloud y DevOps',
      extendedInfo: [
        'Modernizamos y llevamos tu infraestructura hacia una elasticidad total. Reducimos los tiempos de despliegue automatizando pipelines y maximizamos el blindaje del servidor con métricas activas y escalabilidad auto-gestionada.'
      ],
      technologies: [
        'AWS / Google Cloud',
        'Docker & Kubernetes',
        'Pipelines CI/CD',
        'Arquitectura Serverless'
      ]
    },
    {
      id: 'ai-solutions',
      title: 'Soluciones con Inteligencia Artificial',
      description: 'Automatiza procesos y toma decisiones basadas en datos utilizando modelos de IA generativa y Machine Learning.',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Inteligencia Artificial',
      extendedInfo: [
        'Volvemos a tu negocio dramáticamente competitivo y veloz inyectando IA generativa. Modelamos lógicas de predicción y creamos agentes autónomos de conversación natural listos para interactuar con tus API.'
      ],
      technologies: [
        'Modelos LLM (GPT, Gemini)',
        'Machine Learning',
        'Agentes Autónomos',
        'Análisis Predictivo'
      ]
    }
  ];

  selectedService: ServiceItem | null = null;
  isModalOpen: boolean = false;

  openModal(service: ServiceItem): void {
    this.selectedService = service;
    this.isModalOpen = true;
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    setTimeout(() => {
      this.selectedService = null;
    }, 300); // Wait for animation trick if any
    document.body.style.overflow = '';
  }
}
