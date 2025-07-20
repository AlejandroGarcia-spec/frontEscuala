import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminPageModule } from './pages/admin/admin.module';
import { MenuAdminPage } from './componentes/menu-admin/menu-admin.page';
import { MenuMaestroPage } from "./componentes/menu-maestro/menu-maestro.page";
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MenuPadrePage } from "./componentes/menu-padre/menu-padre.page";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AdminPageModule,
    MenuAdminPage, MenuMaestroPage, ZXingScannerModule, MenuPadrePage],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
