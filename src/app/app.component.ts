import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
   constructor(private menu: MenuController, private router: Router) {}

  isAdmin() {
    return this.router.url.startsWith('/admin');
  }

  isInstructor() {
    return this.router.url.startsWith('/home-instructor');
  }

  isAlumno() {
    return this.router.url.startsWith('/home');
  }
  toggleMenu() {
    this.menu.toggle();
  }

  navigateToPerfil() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/usuario');
    });
  }
  navigateToRegistro() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/registuto');
    });
  }
  navigateToDeportiva() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/deportiva');
    });
  }
  navigateToCultural() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/cultural');
    });
  }
  navigateToCarreras() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/carreras');
    });
  }
  navigateToGrupos() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/grupos-carreras');
    });
  }

  logout() {
    this.menu.close().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
