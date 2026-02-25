import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Example } from './pages/example/example';
import { Projects } from './pages/projects/projects';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'blog',
        component: Example
    },
    {
        path: 'servicios',
        redirectTo: '', // Redirige a la página principal
        pathMatch: 'full'
    },
    {
        path: 'proyectos',
        component: Projects
    }
];
