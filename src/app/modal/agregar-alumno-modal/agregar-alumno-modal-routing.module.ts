import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAlumnoModalPage } from './agregar-alumno-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAlumnoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAlumnoModalPageRoutingModule {}
