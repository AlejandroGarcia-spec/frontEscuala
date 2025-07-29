import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRAlumnoPageRoutingModule } from './qralumno-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRAlumnoPageRoutingModule
  ],
})
export class QRAlumnoPageModule {}
