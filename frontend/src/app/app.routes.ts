import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BlogPage } from './pages/blog/blog';
import { BlogDetailPage } from './pages/blog-detail/blog-detail';
import { CrearPublicacion } from './pages/crear-publicacion/crear-publicacion';
import { FormularioEntrada } from './pages/formulario-entrada/formulario-entrada';
import { Projects } from './pages/projects/projects';
import { ServicesComponent } from './pages/services/services.component';
import { ContactPage } from './pages/contact/contact';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'blog',
        component: BlogPage
    },
    {
        path: 'blog/gestionar',
        component: CrearPublicacion
    },
    {
        path: 'blog/crear',
        component: FormularioEntrada
    },
    {
        path: 'blog/editar/:id',
        component: FormularioEntrada
    },
    {
        path: 'blog/:id',
        component: BlogDetailPage
    },
    {
        path: 'servicios',
        component: ServicesComponent
    },
    {
        path: 'proyectos',
        component: Projects
    },
    {
        path: 'contacto',
        component: ContactPage
    }
];
