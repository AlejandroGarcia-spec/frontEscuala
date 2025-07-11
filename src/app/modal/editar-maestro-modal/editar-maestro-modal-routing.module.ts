import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarMaestroModalPage } from './editar-maestro-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMaestroModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarMaestroModalPageRoutingModule {}
