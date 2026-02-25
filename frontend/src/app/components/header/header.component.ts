import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = signal(false);

  constructor(
    public navigationService: NavigationService,
    private scrollService: ScrollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // El servicio ya maneja el scroll
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  scrollToSection(sectionId: string): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollService.scrollToSection(sectionId), 150);
      });
    } else {
      this.scrollService.scrollToSection(sectionId);
    }
    this.isMenuOpen.set(false);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isMenuOpen.set(false);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
