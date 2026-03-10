import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
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
export class HeaderComponent implements OnDestroy {
    @ViewChild('navbar', { static: false }) navbar!: ElementRef;
    isMenuOpen = signal(false);
    private navEndSub?: Subscription;

    constructor(
        public navigationService: NavigationService,
        private scrollService: ScrollService,
        private router: Router,
        private elementRef: ElementRef,
        public themeService: ThemeService
    ) { }

    ngOnDestroy(): void {
        this.navEndSub?.unsubscribe();
    }

    toggleMenu(): void {
        this.isMenuOpen.update(value => !value);
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    scrollToSection(sectionId: string): void {
        this.isMenuOpen.set(false);

        const doScroll = () => {
            setTimeout(() => this.scrollService.scrollToSection(sectionId), 100);
        };

        const baseUrl = this.router.url.split('?')[0].split('#')[0];
        const isOnHome = baseUrl === '/' || baseUrl === '';

        if (isOnHome) {
            doScroll();
        } else {
            this.navEndSub?.unsubscribe();
            this.navEndSub = this.router.events
                .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
                .subscribe(() => {
                    this.navEndSub?.unsubscribe();
                    this.scrollService.scrollToSectionWhenReady(sectionId);
                });
            this.router.navigate(['/']);
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

    navigateToContact(): void {
        if (this.router.url === '/contacto') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            this.router.navigate(['/contacto']);
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
