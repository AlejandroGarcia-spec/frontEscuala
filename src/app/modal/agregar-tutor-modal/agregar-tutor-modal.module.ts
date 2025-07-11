import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTutorModalPageRoutingModule } from './agregar-tutor-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTutorModalPageRoutingModule
  ],
})
export class AgregarTutorModalPageModule {}
