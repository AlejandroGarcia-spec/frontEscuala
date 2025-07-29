import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';

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
    return this.router.url.startsWith('/dashboard') || this.router.url.startsWith('/docente');
  }
  isPadre() {
    return this.router.url.startsWith('/padres-home') || this.router.url.startsWith('/padre');
  }

  isAlumno() {
    return this.router.url.startsWith('/home');
  }
  toggleMenu() {
    this.menu.toggle();
  }
}
