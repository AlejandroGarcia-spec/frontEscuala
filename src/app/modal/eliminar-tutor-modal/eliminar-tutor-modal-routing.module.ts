import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarTutorModalPage } from './eliminar-tutor-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarTutorModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarTutorModalPageRoutingModule {}
