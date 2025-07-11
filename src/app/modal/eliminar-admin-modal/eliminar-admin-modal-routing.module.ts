import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarAdminModalPage } from './eliminar-admin-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarAdminModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarAdminModalPageRoutingModule {}
