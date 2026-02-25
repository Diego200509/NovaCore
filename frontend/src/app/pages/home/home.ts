import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeroComponent],
  templateUrl: './home.html',
  styleUrl: './home.sass',
})
export class Home {

}
