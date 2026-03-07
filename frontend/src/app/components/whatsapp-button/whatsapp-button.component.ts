import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss'
})
export class WhatsAppButtonComponent {
  @Input() phoneNumber: string = '+593961957956';
  @Input() message: string = 'Hola, me gustaría obtener más información';

  encodeMessage(message: string): string {
    return encodeURIComponent(message);
  }
}

