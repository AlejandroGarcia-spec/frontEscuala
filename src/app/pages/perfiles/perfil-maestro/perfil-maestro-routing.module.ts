import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilMaestroPage } from './perfil-maestro.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilMaestroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilMaestroPageRoutingModule {}
