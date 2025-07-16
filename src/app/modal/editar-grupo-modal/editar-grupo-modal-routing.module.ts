import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarGrupoModalPage } from './editar-grupo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditarGrupoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarGrupoModalPageRoutingModule {}
