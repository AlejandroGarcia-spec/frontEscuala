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
      }
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
