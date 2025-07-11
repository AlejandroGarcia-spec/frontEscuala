import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTutorModalPageRoutingModule } from './editar-tutor-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTutorModalPageRoutingModule
  ],
})
export class EditarTutorModalPageModule {}
