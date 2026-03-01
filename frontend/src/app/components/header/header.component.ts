import { Component, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';
import { ScrollService } from '../../shared/services/scroll.service';
import { ThemeService } from '../../shared/services/theme';
import { signal } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, NgOptimizedImage],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @ViewChild('navbar', { static: false }) navbar!: ElementRef;
    isMenuOpen = signal(false);

    constructor(
        public navigationService: NavigationService,
        private scrollService: ScrollService,
        private router: Router,
        private elementRef: ElementRef,
        public themeService: ThemeService
    ) { }

    toggleMenu(): void {
        this.isMenuOpen.update(value => !value);
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    scrollToSection(sectionId: string): void {
        this.isMenuOpen.set(false);

        const scrollFn = () => {
             // We need a generous timeout to ensure Angular renders everything
             // especially metrics, nosotros which might push the footer down.
             setTimeout(() => {
                 this.scrollService.scrollToSection(sectionId);
             }, 400);
        };

        if (this.router.url !== '/' && this.router.url.split('#')[0] !== '/') {
            // Navigate home and then scroll
            this.router.navigate(['/']).then(() => scrollFn());
        } else {
            // Already on home, just scroll
            scrollFn();
        }
    }

    navigateTo(path: string): void {
        this.router.navigate([path]);
        this.isMenuOpen.set(false);
    }

    navigateToProjects(): void {
        if (this.router.url === '/proyectos') {
            // Si ya estamos en proyectos, hacer scroll al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Navegar a la página de proyectos
            this.router.navigate(['/proyectos']);
        }
        this.isMenuOpen.set(false);
    }

    navigateToServices(): void {
        if (this.router.url === '/servicios') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            this.router.navigate(['/servicios']);
        }
        this.isMenuOpen.set(false);
    }

    closeMenu(): void {
        this.isMenuOpen.set(false);
    }

    getNavbarClasses(): Record<string, boolean> {
        const isDark = this.themeService.isDarkMode();
        return {
            'scrolled': this.navigationService.isScrolled(),
            'text-light': isDark,
            'text-dark': !isDark,
            'open': this.isMenuOpen()
        };
    }
}
