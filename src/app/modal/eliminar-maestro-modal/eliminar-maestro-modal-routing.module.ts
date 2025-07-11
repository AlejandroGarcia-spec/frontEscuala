import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarMaestroModalPage } from './eliminar-maestro-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarMaestroModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarMaestroModalPageRoutingModule {}
