import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { BlogHttpService } from '../../services/blog-http-service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-formulario-entrada',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    QuillEditorComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './formulario-entrada.html',
  styleUrl: './formulario-entrada.sass',
})
export class FormularioEntrada implements OnInit, OnDestroy {
  editingId: number | null = null;
  title = '';
  description = '';
  authorsInput = '';
  tagsInput = '';
  urlsInput = '';
  apiKey = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  loadingBlog = true;
  message = { type: '' as 'success' | 'error' | '', text: '' };

  /** Modal para elegir tamaño de tabla al insertar */
  showTableModal = false;
  tableRows = 3;
  tableCols = 3;
  private tableInsertCallback: ((rows: number, cols: number) => void) | null = null;
  private tableRequestListener = (e: Event) => this.onTableRequest(e as CustomEvent);

  constructor(
    private blogService: BlogHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  get isEditMode(): boolean {
    return this.editingId != null;
  }

  goToGestionar(): void {
    this.router.navigate(['/blog/gestionar']);
  }

  ngOnInit(): void {
    window.addEventListener('nova-core-request-table', this.tableRequestListener);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numId = parseInt(id, 10);
      if (!isNaN(numId)) {
        this.editingId = numId;
        this.blogService.getBlogById(numId).subscribe({
          next: (blog: Blog) => {
            this.title = blog.title;
            this.description = blog.description ?? '';
            this.authorsInput = blog.authors?.join(', ') ?? '';
            this.tagsInput = blog.tags?.join(', ') ?? '';
            this.urlsInput = blog.urls?.join(', ') ?? '';
            this.imagePreview = blog.image || null;
            this.loadingBlog = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.loadingBlog = false;
            this.message = { type: 'error', text: 'No se pudo cargar la publicación.' };
            this.cdr.detectChanges();
          },
        });
        return;
      }
    }
    this.loadingBlog = false;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('nova-core-request-table', this.tableRequestListener);
  }

  private onTableRequest(e: CustomEvent): void {
    const insert = e.detail?.insert as ((rows: number, cols: number) => void) | undefined;
    if (typeof insert !== 'function') return;
    this.tableInsertCallback = insert;
    this.tableRows = 3;
    this.tableCols = 3;
    this.showTableModal = true;
    this.cdr.detectChanges();
  }

  confirmTableInsert(): void {
    if (!this.tableInsertCallback) return;
    const rows = Math.max(1, Math.min(20, Number(this.tableRows) || 3));
    const cols = Math.max(1, Math.min(20, Number(this.tableCols) || 3));
    this.tableInsertCallback(rows, cols);
    this.tableInsertCallback = null;
    this.showTableModal = false;
    this.cdr.detectChanges();
  }

  cancelTableModal(): void {
    this.tableInsertCallback = null;
    this.showTableModal = false;
    this.cdr.detectChanges();
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
      this.cdr.detectChanges();
      return;
    }
    if (this.title.trim().length > 100) {
      this.loading = false;
      this.message = { type: 'error', text: 'El título no puede superar 100 caracteres.' };
      this.cdr.detectChanges();
      return;
    }
    if (authors.length === 0) {
      this.loading = false;
      this.message = { type: 'error', text: 'Debe haber al menos un autor.' };
      this.cdr.detectChanges();
      return;
    }
    if (urls.length === 0) {
      this.loading = false;
      this.message = { type: 'error', text: 'Debe haber al menos un enlace.' };
      this.cdr.detectChanges();
      return;
    }
    const isEditing = this.editingId != null;
    if (!isEditing && !this.imageFile) {
      this.loading = false;
      this.message = { type: 'error', text: 'La imagen es obligatoria.' };
      this.cdr.detectChanges();
      return;
    }
    if (!this.apiKey?.trim()) {
      this.loading = false;
      this.message = { type: 'error', text: 'La API Key es obligatoria para publicar.' };
      this.cdr.detectChanges();
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
          this.cdr.detectChanges();
          setTimeout(() => this.router.navigate(['/blog/gestionar']), 1200);
        },
        error: (err: { error?: { message?: string }; message?: string }) => {
          this.loading = false;
          this.message = {
            type: 'error',
            text: err?.error?.message || err?.message || 'Error al actualizar la publicación.',
          };
          this.cdr.detectChanges();
        },
      });
    } else {
      this.blogService.createBlog({ ...body, imageBase64: imageBase64! }, apiKey).subscribe({
        next: () => {
          this.loading = false;
          this.message = { type: 'success', text: 'Publicación creada correctamente.' };
          this.cdr.detectChanges();
          setTimeout(() => this.router.navigate(['/blog/gestionar']), 1200);
        },
        error: (err: { error?: { message?: string }; message?: string }) => {
          this.loading = false;
          this.message = {
            type: 'error',
            text: err?.error?.message || err?.message || 'Error al crear la publicación.',
          };
          this.cdr.detectChanges();
        },
      });
    }
  }
}
