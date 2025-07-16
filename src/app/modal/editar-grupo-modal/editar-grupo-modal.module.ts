import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarGrupoModalPageRoutingModule } from './editar-grupo-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarGrupoModalPageRoutingModule
  ],
})
export class EditarGrupoModalPageModule {}
