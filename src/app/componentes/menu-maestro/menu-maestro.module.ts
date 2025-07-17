import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuMaestroPageRoutingModule } from './menu-maestro-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuMaestroPageRoutingModule
  ],

})
export class MenuMaestroPageModule {}
