import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NosotrosComponent } from '../../components/nosotros/nosotros.component';
import { WhatsAppButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    NosotrosComponent,
    WhatsAppButtonComponent,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.sass',
})
export class ContactPage {
  formSent = false;
  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  sendMessage(): void {
    if (!this.formData.name?.trim() || !this.formData.email?.trim() || !this.formData.message?.trim()) {
      return;
    }
    this.formSent = true;
    this.formData = { name: '', email: '', subject: '', message: '' };
  }
}
