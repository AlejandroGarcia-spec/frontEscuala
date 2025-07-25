import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMaestroModalPage } from './agregar-maestro-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMaestroModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMaestroModalPageRoutingModule {}
