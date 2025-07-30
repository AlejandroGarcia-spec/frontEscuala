import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarMaestroModalPageRoutingModule } from './eliminar-maestro-modal-routing.module';

import { EliminarMaestroModalPage } from './eliminar-maestro-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarMaestroModalPageRoutingModule
  ],
})
export class EliminarMaestroModalPageModule {}
