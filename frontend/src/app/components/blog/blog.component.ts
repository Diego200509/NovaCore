import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Blog } from '../../interfaces/blog';
import { BlogHttpService } from '../../services/blog-http-service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogs = signal<Blog[]>([]);
  /** Última publicación (la más reciente) para destacar arriba */
  featuredBlog = signal<Blog | null>(null);
  /** Resto de publicaciones para el grid */
  restBlogs = signal<Blog[]>([]);
  loading = signal(true);
  private blogService = inject(BlogHttpService);
  private router = inject(Router);

  /** Navega al detalle pasando el blog completo en state para mostrar siempre la entrada clickeada. */
  goToBlog(blog: Blog): void {
    if (blog?.id != null && !isNaN(blog.id)) {
      this.router.navigate(['/blog', blog.id], { state: { blog } });
    }
  }

  ngOnInit(): void {
    this.loading.set(true);

    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs.set(data);
        // La API ya devuelve ordenado por createdAt desc; el primero es el más reciente
        this.featuredBlog.set(data.length > 0 ? data[0] : null);
        this.restBlogs.set(data.length > 1 ? data.slice(1) : []);

        this.loading.set(false);
      },
      error: () => {
        this.blogs.set([]);
        this.featuredBlog.set(null);
        this.restBlogs.set([]);
        this.loading.set(false);
      },
    });
  }
  
  /** Quita etiquetas HTML y luego trunca el texto para vistas previas. */
  stripHtml(html: string): string {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').trim();
  }

  truncateDescription(text: string, maxLen: number): string {
    const plain = this.stripHtml(text);
    if (!plain) return '';
    return plain.length <= maxLen ? plain : plain.slice(0, maxLen).trim() + '…';
  }

  formatDate(value: Date | string): string {
    if (!value) return '';
    const d = typeof value === 'string' ? new Date(value) : value;
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
