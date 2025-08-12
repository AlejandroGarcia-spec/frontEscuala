import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PadresHomePageRoutingModule } from './padres-home-routing.module';
// import { ListaPageRoutingModule } from '../alumnos/lista/lista-routing.module';
// import { FormularioModalComponent } from 'src/app/modal/formulario-modal/formulario-modal.component';
// import { MenuPadrePageRoutingModule } from 'src/app/componentes/menu-padre/menu-padre-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PadresHomePageRoutingModule,
    // ListaPageRoutingModule,
    // FormularioModalComponent,
    // MenuPadrePageRoutingModule
  ],
})
export class PadresHomePageModule {}
