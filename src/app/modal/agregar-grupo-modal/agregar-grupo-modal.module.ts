import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarGrupoModalPageRoutingModule } from './agregar-grupo-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarGrupoModalPageRoutingModule
  ],
})
export class AgregarGrupoModalPageModule {}
