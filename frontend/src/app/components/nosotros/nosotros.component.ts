import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { TeamMember } from '../../shared/models/team-member.model';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NosotrosComponent implements OnInit, AfterViewInit {
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
    // Inicialización si es necesario
  }

  ngAfterViewInit(): void {
    this.initTeamSwiper();
  }

  private initTeamSwiper(): void {
    Swiper.use([Navigation, Pagination, Autoplay]);

    new Swiper('.teamSwiper', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 3,
      slidesPerGroup: 1, // Advance 1 by 1 for fluidness instead of groups of 3
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      speed: 800, // Smooth transition duration
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.team-pagination',
        clickable: true,
        dynamicBullets: true
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
          slidesPerGroup: 1,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 30
        }
      }
    });
  }
}

