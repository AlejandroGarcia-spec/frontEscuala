import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PadresHomePageRoutingModule } from './padres-home-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PadresHomePageRoutingModule
  ],
})
export class PadresHomePageModule {}
