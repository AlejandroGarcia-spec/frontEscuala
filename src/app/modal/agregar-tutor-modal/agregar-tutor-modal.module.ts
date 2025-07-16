import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AgregarTutorModalPageRoutingModule } from './agregar-tutor-modal-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTutorModalPageRoutingModule
  ],
})
export class AgregarTutorModalPageModule {}
