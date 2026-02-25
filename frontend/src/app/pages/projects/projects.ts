import { Component } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { WhatsAppButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [HeaderComponent, ProjectsComponent, FooterComponent, WhatsAppButtonComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.sass',
})
export class Projects {
}

