import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NosotrosComponent } from '../../components/nosotros/nosotros.component';
import { WhatsAppButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { MetricsComponent } from '../../components/metrics/metrics.component';
import { FeaturedServicesComponent } from '../../components/featured-services/featured-services.component';
import { FeaturedProjectsComponent } from '../../components/featured-projects/featured-projects.component';
import { FeaturedBlogsComponent } from '../../components/featured-blogs/featured-blogs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent, 
    MetricsComponent, 
    FeaturedServicesComponent,
    FeaturedProjectsComponent,
    FeaturedBlogsComponent,
    FooterComponent, 
    NosotrosComponent, 
    WhatsAppButtonComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.sass',
})
export class Home {

}
