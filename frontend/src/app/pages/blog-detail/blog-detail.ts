import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogHttpService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const numId = id ? parseInt(id, 10) : NaN;
    if (isNaN(numId)) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }
    this.blogService.getBlogById(numId).subscribe({
      next: (data) => {
        this.blog.set(data);
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
