import { Component } from '@angular/core';
import { BlogComponent } from '../../components/blog/blog.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [HeaderComponent, BlogComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.sass',
})
export class BlogPage {}
