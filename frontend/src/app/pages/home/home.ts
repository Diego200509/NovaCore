import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NosotrosComponent } from '../../components/nosotros/nosotros.component';
import { WhatsAppButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { MetricsComponent } from '../../components/metrics/metrics.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, MetricsComponent, FooterComponent, NosotrosComponent, WhatsAppButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.sass',
})
export class Home {

}
