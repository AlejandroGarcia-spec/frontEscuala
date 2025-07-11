import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTutorModalPage } from './editar-tutor-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTutorModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTutorModalPageRoutingModule {}
