import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  private blogService = inject(BlogHttpService);

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs.set(data);
        const sorted = [...data].sort((a, b) => {
          const da = new Date(a.createdAt).getTime();
          const db = new Date(b.createdAt).getTime();
          return db - da;
        });
        this.featuredBlog.set(sorted.length > 0 ? sorted[0] : null);
        this.restBlogs.set(sorted.length > 1 ? sorted.slice(1) : []);
      },
      error: () => {
        this.blogs.set([]);
        this.featuredBlog.set(null);
        this.restBlogs.set([]);
      },
    });
  }

  truncateDescription(text: string, maxLen: number): string {
    if (!text) return '';
    return text.length <= maxLen ? text : text.slice(0, maxLen).trim() + '…';
  }

  formatDate(value: Date | string): string {
    if (!value) return '';
    const d = typeof value === 'string' ? new Date(value) : value;
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
