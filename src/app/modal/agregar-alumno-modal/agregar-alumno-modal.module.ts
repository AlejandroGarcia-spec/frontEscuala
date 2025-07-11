import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAlumnoModalPageRoutingModule } from './agregar-alumno-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAlumnoModalPageRoutingModule
  ],
})
export class AgregarAlumnoModalPageModule {}
