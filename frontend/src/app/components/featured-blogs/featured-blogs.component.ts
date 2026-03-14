import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Blog } from '../../interfaces/blog';
import { BlogHttpService } from '../../services/blog-http-service';

@Component({
  selector: 'app-featured-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-blogs.component.html',
  styleUrl: './featured-blogs.component.scss'
})
export class FeaturedBlogsComponent implements OnInit {
  featuredBlogs = signal<Blog[]>([]);
  loading = signal(true);
  private blogService = inject(BlogHttpService);

  ngOnInit(): void {
    this.loading.set(true);
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        // Ordenar por fecha más reciente y tomar los 3 primeros
        const sorted = [...data].sort((a, b) => {
          const da = new Date(a.createdAt).getTime();
          const db = new Date(b.createdAt).getTime();
          return db - da;
        });
        this.featuredBlogs.set(sorted.slice(0, 3));
        this.loading.set(false);
      },
      error: () => {
        this.featuredBlogs.set([]);
        this.loading.set(false);
      },
    });
  }

  /** Quita etiquetas HTML y normaliza el texto para vistas previas de blog. */
  stripHtml(html: string): string {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent ?? div.innerText ?? '';
    return text.replace(/\s+/g, ' ').trim();
  }

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

