import { Component } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [HeaderComponent, ProjectsComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.sass',
})
export class Projects {
}

