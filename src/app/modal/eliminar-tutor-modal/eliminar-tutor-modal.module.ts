import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarTutorModalPageRoutingModule } from './eliminar-tutor-modal-routing.module';

import { EliminarTutorModalPage } from './eliminar-tutor-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarTutorModalPageRoutingModule
  ],
  declarations: [EliminarTutorModalPage]
})
export class EliminarTutorModalPageModule {}
