import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarAdminModalPageRoutingModule } from './eliminar-admin-modal-routing.module';

import { EliminarAdminModalPage } from './eliminar-admin-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarAdminModalPageRoutingModule
  ],
})
export class EliminarAdminModalPageModule {}
