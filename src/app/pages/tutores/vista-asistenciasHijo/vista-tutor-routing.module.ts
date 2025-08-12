import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaTutorPage } from './vista-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: VistaTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaTutorPageRoutingModule {}
