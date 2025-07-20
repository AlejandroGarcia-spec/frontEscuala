import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPadrePage } from './menu-padre.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPadrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPadrePageRoutingModule {}
