import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarGrupoModalPage } from './agregar-grupo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarGrupoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarGrupoModalPageRoutingModule {}
