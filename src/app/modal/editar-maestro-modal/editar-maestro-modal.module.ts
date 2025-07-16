import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarMaestroModalPageRoutingModule } from './editar-maestro-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarMaestroModalPageRoutingModule
  ],
})
export class EditarMaestroModalPageModule {}
