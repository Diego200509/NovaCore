import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter, switchMap, EMPTY, map } from 'rxjs';
import { BlogHttpService } from '../../services/blog-http-service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.sass',
})
export class BlogDetailPage implements OnInit {
  blog = signal<Blog | null>(null);
  loading = signal(true);
  notFound = signal(false);
  /** Blog pasado desde la lista al hacer clic; así mostramos siempre la entrada correcta. */
  private blogFromState: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogHttpService,
    private sanitizer: DomSanitizer
  ) {
    const nav = inject(Router).getCurrentNavigation();
    const stateBlog = nav?.extras?.state?.['blog'];
    if (stateBlog && typeof stateBlog === 'object' && 'id' in stateBlog && 'title' in stateBlog) {
      this.blogFromState = stateBlog as Blog;
    }
  }

  sanitizeDescription(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || '');
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      filter((params) => params.has('id')),
      switchMap((params) => {
        const id = params.get('id');
        const numId = id ? parseInt(id, 10) : NaN;
        if (isNaN(numId)) {
          this.notFound.set(true);
          this.loading.set(false);
          return EMPTY;
        }
        this.notFound.set(false);
        // Si tenemos el blog desde la lista (state), lo mostramos de inmediato
        if (this.blogFromState && this.blogFromState.id === numId) {
          this.blog.set(this.blogFromState);
          this.loading.set(false);
        } else {
          this.loading.set(true);
          this.blog.set(null);
        }
        return this.blogService.getBlogById(numId).pipe(
          map((data) => ({ data, requestedId: numId }))
        );
      })
    ).subscribe({
      next: ({ data, requestedId }) => {
        const currentParam = this.route.snapshot.paramMap.get('id');
        const currentId = currentParam ? parseInt(currentParam, 10) : NaN;
        if (requestedId === currentId && data.id === requestedId) {
          this.blog.set(data);
        }
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }

  formatDate(value: Date | string): string {
    if (!value) return '';
    const d = typeof value === 'string' ? new Date(value) : value;
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
