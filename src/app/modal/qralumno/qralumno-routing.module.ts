import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRAlumnoPage } from './qralumno.page';

const routes: Routes = [
  {
    path: '',
    component: QRAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRAlumnoPageRoutingModule {}
