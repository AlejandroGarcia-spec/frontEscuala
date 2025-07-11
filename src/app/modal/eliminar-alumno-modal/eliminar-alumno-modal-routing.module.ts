import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarAlumnoModalPage } from './eliminar-alumno-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarAlumnoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarAlumnoModalPageRoutingModule {}
