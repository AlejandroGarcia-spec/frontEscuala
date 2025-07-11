import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAdminModalPageRoutingModule } from './editar-admin-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAdminModalPageRoutingModule
  ],
})
export class EditarAdminModalPageModule {}
