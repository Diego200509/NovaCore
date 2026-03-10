import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CorporateItem {
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-corporate-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corporate-about.component.html',
  styleUrl: './corporate-about.component.scss',
})
export class CorporateAboutComponent {
  items: CorporateItem[] = [
    {
      title: 'Misión',
      icon: 'fas fa-bullseye',
      description: 'Soluciones de software que impulsan tu crecimiento, con innovación técnica y enfoque en el usuario.',
    },
    {
      title: 'Visión',
      icon: 'fas fa-eye',
      description: 'Ser el estudio de referencia en la región por calidad, agilidad y compromiso con cada proyecto.',
    },
    {
      title: 'Nuestro compromiso',
      icon: 'fas fa-handshake',
      description: 'Entregar a tiempo, comunicar con claridad y construir soluciones que escalen con tu negocio.',
    },
  ];
}
