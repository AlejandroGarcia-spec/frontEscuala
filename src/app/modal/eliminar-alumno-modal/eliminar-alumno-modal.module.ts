import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarAlumnoModalPageRoutingModule } from './eliminar-alumno-modal-routing.module';

import { EliminarAlumnoModalPage } from './eliminar-alumno-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarAlumnoModalPageRoutingModule
  ],
  declarations: [EliminarAlumnoModalPage]
})
export class EliminarAlumnoModalPageModule {}
