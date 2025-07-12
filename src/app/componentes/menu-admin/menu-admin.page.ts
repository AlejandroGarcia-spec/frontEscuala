import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu-admin',
  imports: [IonicModule],
  standalone: true,
  templateUrl: './menu-admin.page.html',
  styleUrls: ['./menu-admin.page.scss'],
})
export class MenuAdminPage  {
 @Input() titulo!: string;

  constructor(
    private authS: AuthService,
    private menu: MenuController,
    private router: Router) { }

  toggleMenu() {
    this.menu.toggle();
  }
  navigateToPerfil() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/perfil-admin');
    });
  }
  navigateToTutoresFormulario() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/tutores/formulario');
    });
  }
  navigateToAdminsFormulario() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/alumnos/formulario');
    });
  }
  navigateToRegistroMaestros() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/maestros/registro');
    });
  }
  navigateToRegistroAlumnos() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/alumnos/formulario');
    });
  }
  navigateToRegistroGrupos() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/grupos');
    });
  }
  navigateToMaestros() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/maestros/registro');
    });
  }

  logout() {
    this.menu.close().then(() => {
      this.authS.logout();
    });
  }

}

