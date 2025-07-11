import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMaestroModalPageRoutingModule } from './agregar-maestro-modal-routing.module';

import { AgregarMaestroModalPage } from './agregar-maestro-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMaestroModalPageRoutingModule
  ],
  declarations: [AgregarMaestroModalPage]
})
export class AgregarMaestroModalPageModule {}
