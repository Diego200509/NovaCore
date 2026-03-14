import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Blog } from '../../interfaces/blog';
import { BlogHttpService } from '../../services/blog-http-service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  
  /** Quita etiquetas HTML y normaliza el texto para vistas previas de blog. */
  stripHtml(html: string): string {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = (tmp.textContent || tmp.innerText || '').trim();
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * Prepara un excerpt para la vista previa: normaliza espacios, separa cualquier
   * palabra (Introducción, Definición, Resumen, etc.) del texto siguiente si van
   * pegados y trunca por palabra completa.
   */
  truncateDescription(text: string, maxLen: number): string {
    if (!text) return '';
    let plain = this.stripHtml(text);
    if (!plain) return '';
    // Si una minúscula (o letra con tilde) va pegada a una mayúscula, insertar ". " (ej: "DefinicionLa" -> "Definicion. La")
    plain = plain.replace(/([a-záéíóúñü])([A-ZÁÉÍÓÚÑ])/g, '$1. $2');
    if (plain.length <= maxLen) return plain;
    const cut = plain.slice(0, maxLen);
    const lastSpace = cut.lastIndexOf(' ');
    const end = lastSpace > 0 ? lastSpace : maxLen;
    return cut.slice(0, end).trim() + '…';
  }

  formatDate(value: Date | string): string {
    if (!value) return '';
    const d = typeof value === 'string' ? new Date(value) : value;
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
