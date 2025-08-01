import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  standalone: true,
  styleUrls: ['./admin.page.scss'],
  imports: [IonicModule]

})
export class AdminPage  {

  constructor(private readonly router: Router,
    private readonly authService: AuthService,
      private readonly menu: MenuController,

  ) { }
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  toggleMenu() {
    this.menu.toggle();
  }
  // 👉 Métodos de navegación
  irATutores() {
    this.router.navigate(['/tutores/formulario']);
  }

  irAAlumnos() {
    this.router.navigate(['/alumnos/formulario']);
  }

  irAGrupos() {
    this.router.navigate(['/grupos']);
  }

  irAMaestros() {
    this.router.navigate(['/maestros/registro']);
  }

}
