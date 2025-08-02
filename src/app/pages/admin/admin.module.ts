import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    AdminPage
  ],

})
export class AdminPageModule {}
 