import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ScrollService } from '../../shared/services/scroll.service';

interface Technology {
  icon: string;
  name: string;
  top: number;
  left: number;
  delay: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {
  technologies: Technology[] = [];

  private techList = [
    { icon: 'fab fa-angular', name: 'Angular' },
    { icon: 'fab fa-react', name: 'React' },
    { icon: 'fab fa-aws', name: 'AWS' },
    { icon: 'fab fa-google', name: 'Google Cloud' },
    { icon: 'fab fa-node-js', name: 'Node.js' },
    { icon: 'fab fa-python', name: 'Python' },
    { icon: 'fab fa-docker', name: 'Docker' },
    { icon: 'fab fa-js', name: 'JavaScript' },
    { icon: 'fab fa-git-alt', name: 'Git' },
    { icon: 'fab fa-html5', name: 'HTML5' },
    { icon: 'fab fa-css3-alt', name: 'CSS3' },
    { icon: 'fab fa-java', name: 'Java' }
  ];

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.generateRandomTechnologies();
  }

  private generateRandomTechnologies(): void {
    // Barajar el array
    const shuffled = this.shuffle([...this.techList]);

    // Generar posiciones aleatorias para cada tecnología
    this.technologies = shuffled.map((tech, index) => ({
      ...tech,
      top: Math.random() * 80 + 5, // Entre 5% y 85% del alto
      left: Math.random() * 90 + 5, // Entre 5% y 95% del ancho
      delay: index * 0.8  // Delay escalonado
    }));
  }

  private shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  scrollToContact(): void {
    this.scrollService.scrollToSection('contacto');
  }
}
