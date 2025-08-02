import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaAlumnoPage } from './ficha-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: FichaAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaAlumnoPageRoutingModule {}
