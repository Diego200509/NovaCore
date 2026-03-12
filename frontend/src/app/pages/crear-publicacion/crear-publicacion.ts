import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogHttpService } from '../../services/blog-http-service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-crear-publicacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    CardComponent,
  ],
  templateUrl: './crear-publicacion.html',
  styleUrl: './crear-publicacion.sass',
})
export class CrearPublicacion implements OnInit {
  blogs = signal<Blog[]>([]);
  deleteModalOpen = false;
  blogToDelete: Blog | null = null;
  deleteApiKey = '';
  deleteLoading = false;
  deleteMessage = '';

  constructor(
    private blogService: BlogHttpService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data: Blog[]) => this.blogs.set(data),
      error: () => this.blogs.set([]),
    });
  }

  confirmDelete(blog: Blog): void {
    this.blogToDelete = blog;
    this.deleteApiKey = '';
    this.deleteMessage = '';
    this.deleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.blogToDelete = null;
    this.deleteApiKey = '';
    this.deleteMessage = '';
    this.deleteLoading = false;
  }

  doDelete(id: number, key: string): void {
    this.deleteLoading = true;
    this.deleteMessage = '';
    this.cdr.detectChanges();
    this.blogService.deleteBlog(id, key).subscribe({
      next: () => {
        this.deleteLoading = false;
        this.closeDeleteModal();
        this.loadBlogs();
        this.cdr.detectChanges();
      },
      error: (err: { error?: { message?: string }; message?: string }) => {
        this.deleteLoading = false;
        this.deleteMessage = err?.error?.message || err?.message || 'Error al eliminar la publicación.';
        this.cdr.detectChanges();
      },
    });
  }

  submitDelete(): void {
    const key = this.deleteApiKey?.trim();
    if (!key) {
      this.deleteMessage = 'Introduce tu API Key para poder eliminar.';
      return;
    }
    if (!this.blogToDelete) return;
    this.deleteMessage = '';
    this.doDelete(this.blogToDelete.id, key);
  }

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
}
