import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogHttpService } from '../../services/blog-http-service';
import { HeaderComponent } from '../../components/header/header.component';
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
    CardComponent,
  ],
  templateUrl: './crear-publicacion.html',
  styleUrl: './crear-publicacion.sass',
})
export class CrearPublicacion implements OnInit {
  blogs: Blog[] = [];
  modalOpen = false;
  editingId: number | null = null;
  deleteModalOpen = false;
  blogToDelete: Blog | null = null;
  deleteApiKey = '';

  title = '';
  description = '';
  authorsInput = '';
  tagsInput = '';
  urlsInput = '';
  apiKey = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  deleteLoading = false;
  message = { type: '' as 'success' | 'error' | '', text: '' };

  constructor(
    private blogService: BlogHttpService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data: Blog[]) => (this.blogs = data),
      error: () => (this.blogs = []),
    });
  }

  openModal(blog?: Blog): void {
    this.editingId = blog ? blog.id : null;
    this.message = { type: '', text: '' };
    if (blog) {
      this.title = blog.title;
      this.description = blog.description;
      this.authorsInput = blog.authors?.join(', ') ?? '';
      this.tagsInput = blog.tags?.join(', ') ?? '';
      this.urlsInput = blog.urls?.join(', ') ?? '';
      this.imageFile = null;
      this.imagePreview = blog.image || null;
    } else {
      this.title = '';
      this.description = '';
      this.authorsInput = '';
      this.tagsInput = '';
      this.urlsInput = '';
      this.imageFile = null;
      this.imagePreview = null;
    }
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.editingId = null;
    this.message = { type: '', text: '' };
    this.title = '';
    this.description = '';
    this.authorsInput = '';
    this.tagsInput = '';
    this.urlsInput = '';
    this.imageFile = null;
    this.imagePreview = null;
    // No se limpia apiKey para poder usarla al eliminar
  }

  confirmDelete(blog: Blog): void {
    this.blogToDelete = blog;
    this.deleteApiKey = this.apiKey?.trim() || '';
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
        this.apiKey = key;
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

  deleteMessage = '';

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

  onBackdropClick(): void {
    this.closeModal();
  }

  onModalContentClick(event: Event): void {
    event.stopPropagation();
  }

  truncateDescription(text: string, maxLen: number): string {
    if (!text) return '';
    return text.length <= maxLen ? text : text.slice(0, maxLen).trim() + '…';
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  private toArray(value: string): string[] {
    return value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async submit(): Promise<void> {
    this.message = { type: '', text: '' };
    this.loading = true;
    this.cdr.detectChanges();

    const authors = this.toArray(this.authorsInput);
    const urls = this.toArray(this.urlsInput);

    if (!this.title.trim()) {
      this.loading = false;
      this.message = { type: 'error', text: 'El título es obligatorio (máx. 100 caracteres).' };
      return;
    }
    if (this.title.trim().length > 100) {
      this.loading = false;
      this.message = { type: 'error', text: 'El título no puede superar 100 caracteres.' };
      return;
    }
    if (!this.description.trim()) {
      this.loading = false;
      this.message = { type: 'error', text: 'La descripción es obligatoria (máx. 255 caracteres).' };
      return;
    }
    if (this.description.trim().length > 255) {
      this.loading = false;
      this.message = { type: 'error', text: 'La descripción no puede superar 255 caracteres.' };
      return;
    }
    if (authors.length === 0) {
      this.loading = false;
      this.message = { type: 'error', text: 'Debe haber al menos un autor.' };
      return;
    }
    if (urls.length === 0) {
      this.loading = false;
      this.message = { type: 'error', text: 'Debe haber al menos un enlace.' };
      return;
    }
    const isEditing = this.editingId != null;
    if (!isEditing && !this.imageFile) {
      this.loading = false;
      this.message = { type: 'error', text: 'La imagen es obligatoria.' };
      return;
    }
    if (!this.apiKey?.trim()) {
      this.loading = false;
      this.message = { type: 'error', text: 'La API Key es obligatoria para publicar.' };
      return;
    }

    let imageBase64: string | undefined;
    if (this.imageFile) {
      imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string) || '');
        reader.onerror = reject;
        reader.readAsDataURL(this.imageFile!);
      });
    }

    const body = {
      title: this.title.trim(),
      description: this.description.trim(),
      authors,
      tags: this.toArray(this.tagsInput),
      urls,
      ...(imageBase64 ? { imageBase64 } : {}),
    };

    const apiKey = this.apiKey?.trim() || undefined;

    if (this.editingId != null) {
      this.blogService.updateBlog(this.editingId, body, apiKey).subscribe({
        next: () => {
          this.loading = false;
          this.message = { type: 'success', text: 'Publicación actualizada correctamente.' };
          this.loadBlogs();
          this.cdr.detectChanges();
          setTimeout(() => this.closeModal(), 1200);
        },
        error: (err: { error?: { message?: string }; message?: string }) => {
          this.loading = false;
          const msg = err?.error?.message || err?.message || 'Error al actualizar la publicación.';
          this.message = { type: 'error', text: msg };
          this.cdr.detectChanges();
        },
      });
    } else {
      this.blogService.createBlog({ ...body, imageBase64: imageBase64! }, apiKey).subscribe({
        next: () => {
          this.loading = false;
          this.message = { type: 'success', text: 'Publicación creada correctamente.' };
          this.loadBlogs();
          this.cdr.detectChanges();
          setTimeout(() => this.closeModal(), 1200);
        },
        error: (err: { error?: { message?: string }; message?: string }) => {
          this.loading = false;
          const msg = err?.error?.message || err?.message || 'Error al crear la publicación.';
          this.message = { type: 'error', text: msg };
          this.cdr.detectChanges();
        },
      });
    }
  }
}
