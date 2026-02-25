import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogHttpService } from '../../services/blog-http-service';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-crear-publicacion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent, CardComponent],
  templateUrl: './crear-publicacion.html',
  styleUrl: './crear-publicacion.sass',
})
export class CrearPublicacion implements OnInit {
  blogs: Blog[] = [];
  modalOpen = false;

  title = '';
  description = '';
  authorsInput = '';
  tagsInput = '';
  urlsInput = '';
  apiKey = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  message = { type: '' as 'success' | 'error' | '', text: '' };

  constructor(private blogService: BlogHttpService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => (this.blogs = data),
      error: () => (this.blogs = []),
    });
  }

  openModal(): void {
    this.modalOpen = true;
    this.message = { type: '', text: '' };
  }

  closeModal(): void {
    this.modalOpen = false;
    this.message = { type: '', text: '' };
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

    const authors = this.toArray(this.authorsInput);
    const urls = this.toArray(this.urlsInput);

    if (!this.title.trim()) {
      this.message = { type: 'error', text: 'El título es obligatorio (máx. 100 caracteres).' };
      return;
    }
    if (this.title.trim().length > 100) {
      this.message = { type: 'error', text: 'El título no puede superar 100 caracteres.' };
      return;
    }
    if (!this.description.trim()) {
      this.message = { type: 'error', text: 'La descripción es obligatoria (máx. 255 caracteres).' };
      return;
    }
    if (this.description.trim().length > 255) {
      this.message = { type: 'error', text: 'La descripción no puede superar 255 caracteres.' };
      return;
    }
    if (authors.length === 0) {
      this.message = { type: 'error', text: 'Debe haber al menos un autor.' };
      return;
    }
    if (urls.length === 0) {
      this.message = { type: 'error', text: 'Debe haber al menos un enlace.' };
      return;
    }
    if (!this.imageFile) {
      this.message = { type: 'error', text: 'La imagen es obligatoria.' };
      return;
    }

    let imageBase64 = '';
    imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string) || '');
      reader.onerror = reject;
      reader.readAsDataURL(this.imageFile!);
    });

    const body = {
      title: this.title.trim(),
      description: this.description.trim(),
      authors,
      tags: this.toArray(this.tagsInput),
      urls,
      imageBase64,
    };

    this.loading = true;
    this.blogService.createBlog(body, this.apiKey || undefined).subscribe({
      next: () => {
        this.loading = false;
        this.message = { type: 'success', text: 'Publicación creada correctamente.' };
        this.title = '';
        this.description = '';
        this.authorsInput = '';
        this.tagsInput = '';
        this.urlsInput = '';
        this.imageFile = null;
        this.imagePreview = null;
        this.loadBlogs();
        setTimeout(() => {
          this.closeModal();
        }, 1200);
      },
      error: (err: { error?: { message?: string }; message?: string }) => {
        this.loading = false;
        const msg = err?.error?.message || err?.message || 'Error al crear la publicación.';
        this.message = { type: 'error', text: msg };
      },
    });
  }
}
