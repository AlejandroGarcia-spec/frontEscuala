import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarMaestroModalPageRoutingModule } from './editar-maestro-modal-routing.module';

import { EditarMaestroModalPage } from './editar-maestro-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditarMaestroModalPageRoutingModule
  ],
})
export class EditarMaestroModalPageModule {}
