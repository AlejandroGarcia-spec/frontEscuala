import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAdminModalPage } from './agregar-admin-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAdminModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAdminModalPageRoutingModule {}
