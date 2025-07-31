import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuMaestroPage } from './menu-maestro.page';

const routes: Routes = [
  {
    path: '',
    component: MenuMaestroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuMaestroPageRoutingModule {}
