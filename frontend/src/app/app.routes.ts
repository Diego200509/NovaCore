import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Example } from './pages/example/example';
import { CrearPublicacion } from './pages/crear-publicacion/crear-publicacion';

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
        path: 'blog/crear',
        component: CrearPublicacion
    },
    {
        path: 'servicios',
        redirectTo: '', // Redirige a la página principal
        pathMatch: 'full'
    },
    {
        path: 'proyectos',
        redirectTo: '', // Redirige a la página principal
        pathMatch: 'full'
    }
];
