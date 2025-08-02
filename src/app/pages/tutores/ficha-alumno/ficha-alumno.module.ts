import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaAlumnoPageRoutingModule } from './ficha-alumno-routing.module';

import { FichaAlumnoPage } from './ficha-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaAlumnoPageRoutingModule
  ],
  declarations: [FichaAlumnoPage]
})
export class FichaAlumnoPageModule {}
