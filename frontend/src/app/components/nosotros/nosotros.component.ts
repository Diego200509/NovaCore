import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { TeamMember } from '../../shared/models/team-member.model';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      name: 'Johan Rodríguez',
      imageUrl: '/img/johan.png',
      imageAlt: 'Johan',
      description: 'Ingeniero de Software especializado en Front-End y en diseño UX/UI.',
      profileLink: 'https://kiramman-mp3.github.io/'
    },
    {
      name: 'Diego Jijón',
      imageUrl: '/img/diego.png',
      imageAlt: 'Diego',
      description: 'Especialista en Unity, Clean Architecture y desarrollo de sistemas interactivos a medida.',
      profileLink: 'https://diego200509.github.io/DiegoJijon.github.io/'
    },
    {
      name: 'Ariel Paredes Lozada',
      imageUrl: '/img/ariel.jpg',
      imageAlt: 'Ariel',
      description: 'Experto en backend con Node y Typescript. Arquitecto de bases de datos',
      profileLink: 'https://arielparedeslozada.github.io/'
    },
    {
      name: 'Elkin López',
      imageUrl: '/img/elkin.png',
      imageAlt: 'Elkin',
      description: 'Desarrollador Full Stack con enfoque en bases de datos relacionales e integración de servicios.',
      profileLink: 'https://elkinnn.github.io/ElkinLopez.github.io/'
    },
    {
      name: 'Leonel Barros',
      imageUrl: '/img/leonel.png',
      imageAlt: 'Leonel',
      description: 'Ingeniero DevOps enfocado en la automatización de procesos y optimización de flujos de trabajo.',
      profileLink: 'https://my-profile-fawn-ten.vercel.app/#about'
    },
    {
      name: 'José Manzano',
      imageUrl: '/img/jose.png',
      imageAlt: 'José',
      description: 'Especialista en UI/UX Design y personalización avanzada de interfaces de usuario.',
      profileLink: 'https://josem151.github.io/'
    }
  ];

  ngOnInit(): void {
    this.initTeamSwiper();
  }

  private initTeamSwiper(): void {
    if (typeof window !== 'undefined') {
      // Esperar a que Swiper esté disponible desde el CDN
      const checkSwiper = () => {
        if ((window as any).Swiper) {
          new (window as any).Swiper('.teamSwiper', {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false
            },
            pagination: {
              el: '.team-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.team-next',
              prevEl: '.team-prev'
            },
            breakpoints: {
              320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30
              }
            }
          });
        } else {
          setTimeout(checkSwiper, 100);
        }
      };
      setTimeout(checkSwiper, 100);
    }
  }
}

