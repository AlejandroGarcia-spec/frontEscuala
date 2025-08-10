import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  imports: [IonicModule, CommonModule,RouterModule],
  standalone: true,
  selector: 'app-padres-home',
  templateUrl: './padres-home.page.html',
  styleUrls: ['./padres-home.page.scss'],
})
export class PadresHomePage {

  tutorId!:number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private menu: MenuController,
  ){}

    ngOnInit() {
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    if (!usuario || !usuario.id) {
      console.error('No se encontró el ID del tutor en localStorage');
      return;
    }

    this.tutorId = usuario.id;
    console.log(usuario);
    

  }
  irAsistencias() { }

  irQr() {
    this.router.navigate(['/tutoresqr']);

  }

  irConocidos() {
    this.router.navigate(['/conocidos']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  toggleMenu() {
    this.menu.toggle();
  }



}
