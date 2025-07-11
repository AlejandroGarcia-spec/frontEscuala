import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAlumnoModalPageRoutingModule } from './editar-alumno-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAlumnoModalPageRoutingModule
  ],
})
export class EditarAlumnoModalPageModule {}
