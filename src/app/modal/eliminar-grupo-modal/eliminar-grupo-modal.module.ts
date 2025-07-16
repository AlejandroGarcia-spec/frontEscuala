import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarGrupoModalPageRoutingModule } from './eliminar-grupo-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarGrupoModalPageRoutingModule
  ],
})
export class EliminarGrupoModalPageModule {}
