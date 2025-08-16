import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilMaestroPageRoutingModule } from './perfil-maestro-routing.module';

import { PerfilMaestroPage } from './perfil-maestro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilMaestroPageRoutingModule
  ],
})
export class PerfilMaestroPageModule {}
