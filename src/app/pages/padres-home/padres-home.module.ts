import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PadresHomePageRoutingModule } from './padres-home-routing.module';

import { PadresHomePage } from './padres-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PadresHomePageRoutingModule
  ],
  declarations: [PadresHomePage]
})
export class PadresHomePageModule {}
