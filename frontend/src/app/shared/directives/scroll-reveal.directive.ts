import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';

const VISIBLE_CLASS = 'scroll-reveal-visible';

@Directive({
  selector: '[scrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(VISIBLE_CLASS);
            this.observer?.unobserve(entry.target);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1,
      }
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
