import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
      },
      {
      path: 'login/tutor',
       loadComponent: () => import('./login-tutor/login-tutor.component').then(m => m.LoginTutorComponent)
       
  },

    ]
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule),
    //canActivate: [authGuard, adminGuard]
  },

  {
    path: 'alumnos/lista',
    loadChildren: () => import('./pages/alumnos/lista/lista.module').then(m => m.ListaPageModule)
  },

  {
    path: 'alumnos/detalle',
    loadChildren: () => import('./pages/alumnos/detalle/detalle.module').then(m => m.DetallePageModule)
  },

  {
    path: 'alumnos/formulario',
    loadChildren: () => import('./pages/alumnos/formulario/formulario.module').then(m => m.FormularioPageModule)
  },

  {
    path: 'asistencias/registro',
    loadChildren: () => import('./pages/asistencias/registro/registro.module').then(m => m.RegistroPageModule)
  },

  {
    path: 'salidas/escanear-qr',
    loadChildren: () => import('./pages/salidas/escanear-qr/escanear-qr.module').then(m => m.EscanearQrPageModule)
  },

  {
    path: 'tutores/lista',
    loadChildren: () => import('./pages/tutores/lista/lista.module').then(m => m.ListaPageModule)
  },

  {
    path: 'tutores/formulario',
    loadChildren: () => import('./pages/tutores/formulario/formulario.module').then(m => m.FormularioPageModule)
  },

  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./componentes/footer/footer.module').then( m => m.FooterPageModule)
  },
  {
  path: 'auth/:perfil', // <- así capturamos admin, maestro o tutor
  loadChildren: () => import('./pages/tutores/lista/lista.module').then(m => m.ListaPageModule)
},
  {
    path: 'header',
    loadChildren: () => import('./componentes/header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'menu-admin',
    loadChildren: () => import('./componentes/menu-admin/menu-admin.module').then( m => m.MenuAdminPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/maestros/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil-admin',
    loadChildren: () => import('./pages/perfiles/perfil-admin/perfil-admin.module').then( m => m.PerfilAdminPageModule)
  },
  {
    path: 'perfil-maestro',
    loadChildren: () => import('./pages/perfiles/perfil-maestro/perfil-maestro.module').then( m => m.PerfilMaestroPageModule)
  },
  {
    path: 'perfil-alumno',
    loadChildren: () => import('./pages/perfiles/perfil-alumno/perfil-alumno.module').then( m => m.PerfilAlumnoPageModule)
  },
  {
    path: 'agregar-admin-modal',
    loadChildren: () => import('./modal/agregar-admin-modal/agregar-admin-modal.module').then( m => m.AgregarAdminModalPageModule)
  },
  {
    path: 'editar-admin-modal',
    loadChildren: () => import('./modal/editar-admin-modal/editar-admin-modal.module').then( m => m.EditarAdminModalPageModule)
  },
  {
    path: 'eliminar-admin-modal',
    loadChildren: () => import('./modal/eliminar-admin-modal/eliminar-admin-modal.module').then( m => m.EliminarAdminModalPageModule)
  },
  {
    path: 'agregar-tutor-modal',
    loadChildren: () => import('./modal/agregar-tutor-modal/agregar-tutor-modal.module').then( m => m.AgregarTutorModalPageModule)
  },
  {
    path: 'editar-tutor-modal',
    loadChildren: () => import('./modal/editar-tutor-modal/editar-tutor-modal.module').then( m => m.EditarTutorModalPageModule)
  },
  {
    path: 'eliminar-tutor-modal',
    loadChildren: () => import('./modal/eliminar-tutor-modal/eliminar-tutor-modal.module').then( m => m.EliminarTutorModalPageModule)
  },
  {
    path: 'agregar-alumno-modal',
    loadChildren: () => import('./modal/agregar-alumno-modal/agregar-alumno-modal.module').then( m => m.AgregarAlumnoModalPageModule)
  },
  {
    path: 'editar-alumno-modal',
    loadChildren: () => import('./modal/editar-alumno-modal/editar-alumno-modal.module').then( m => m.EditarAlumnoModalPageModule)
  },
  {
    path: 'eliminar-alumno-modal',
    loadChildren: () => import('./modal/eliminar-alumno-modal/eliminar-alumno-modal.module').then( m => m.EliminarAlumnoModalPageModule)
  },
  {
    path: 'agregar-maestro-modal',
    loadChildren: () => import('./modal/agregar-maestro-modal/agregar-maestro-modal.module').then( m => m.AgregarMaestroModalPageModule)
  },
  {
    path: 'editar-maestro-modal',
    loadChildren: () => import('./modal/editar-maestro-modal/editar-maestro-modal.module').then( m => m.EditarMaestroModalPageModule)
  },
  {
    path: 'eliminar-maestro-modal',
    loadChildren: () => import('./modal/eliminar-maestro-modal/eliminar-maestro-modal.module').then( m => m.EliminarMaestroModalPageModule)
  },
  {
    path: 'grupos',
    loadChildren: () => import('./pages/grupos/grupos.module').then( m => m.GruposPageModule)
  },
  {
    path: 'maestros/registro',
    loadChildren: () => import('./pages/maestros/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'agregar-grupo-modal',
    loadChildren: () => import('./modal/agregar-grupo-modal/agregar-grupo-modal.module').then( m => m.AgregarGrupoModalPageModule)
  },
  {
    path: 'editar-grupo-modal',
    loadChildren: () => import('./modal/editar-grupo-modal/editar-grupo-modal.module').then( m => m.EditarGrupoModalPageModule)
  },
  {
    path: 'eliminar-grupo-modal',
    loadChildren: () => import('./modal/eliminar-grupo-modal/eliminar-grupo-modal.module').then( m => m.EliminarGrupoModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
