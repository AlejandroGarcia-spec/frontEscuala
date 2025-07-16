import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarGrupoModalPage } from './eliminar-grupo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarGrupoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarGrupoModalPageRoutingModule {}
