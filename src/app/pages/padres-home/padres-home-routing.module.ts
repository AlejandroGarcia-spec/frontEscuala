import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PadresHomePage } from './padres-home.page';

const routes: Routes = [
  {
    path: '',
    component: PadresHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadresHomePageRoutingModule {}
