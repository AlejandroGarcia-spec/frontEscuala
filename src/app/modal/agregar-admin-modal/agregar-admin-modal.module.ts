import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAdminModalPageRoutingModule } from './agregar-admin-modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAdminModalPageRoutingModule
  ],
})
export class AgregarAdminModalPageModule {}
