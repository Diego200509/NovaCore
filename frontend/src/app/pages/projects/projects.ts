import { Component } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [HeaderComponent, ProjectsComponent, FooterComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.sass',
})
export class Projects {
}

