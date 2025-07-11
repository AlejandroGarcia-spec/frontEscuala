import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarAdminModalPage } from './editar-admin-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditarAdminModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarAdminModalPageRoutingModule {}
