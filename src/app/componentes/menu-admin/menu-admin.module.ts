import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAdminPageRoutingModule } from './menu-admin-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAdminPageRoutingModule
  ],
})
export class MenuAdminPageModule {}
