import { Component, OnInit, OnDestroy, signal, ElementRef, ViewChild } from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('navbar', { static: false }) navbar!: ElementRef;
    isMenuOpen = signal(false);
    textColor = signal<'light' | 'dark'>('light');
    private animationFrameId: number | null = null;

    constructor(
        public navigationService: NavigationService,
        private scrollService: ScrollService,
        private router: Router,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        this.startColorDetection();
    }

    ngOnDestroy(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    private startColorDetection(): void {
        const detectColor = () => {
            const navbar = this.elementRef.nativeElement.querySelector('.navbar');
            if (navbar) {
                const rect = navbar.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.bottom + 10; // 10px debajo del navbar

                const element = document.elementFromPoint(x, y);
                if (element) {
                    const bgColor = window.getComputedStyle(element).backgroundColor;
                    const isDark = this.isColorDark(bgColor);
                    this.textColor.set(isDark ? 'light' : 'dark');
                }
            }
            this.animationFrameId = requestAnimationFrame(detectColor);
        };

        detectColor();
    }

    private isColorDark(rgbString: string): boolean {
        const rgb = rgbString.match(/\d+/g);
        if (!rgb || rgb.length < 3) return false;

        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);

        // Fórmula de luminancia relativa
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
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

    closeMenu(): void {
        this.isMenuOpen.set(false);
    }

    getNavbarClasses(): Record<string, boolean> {
        return {
            'scrolled': this.navigationService.isScrolled(),
            'text-light': this.textColor() === 'light',
            'text-dark': this.textColor() === 'dark',
            'open': this.isMenuOpen()
        };
    }
}
