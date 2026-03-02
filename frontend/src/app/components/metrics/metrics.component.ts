import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricsComponent implements OnInit {

  metrics = [
    { value: '20+', label: 'Proyectos completados', icon: 'fas fa-rocket' },
    { value: '6', label: 'Especialistas', icon: 'fas fa-users' },
    { value: '5', label: 'Tecnologías core', icon: 'fas fa-laptop-code' },
    { value: '99%', label: 'Satisfacción', icon: 'fas fa-smile' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
