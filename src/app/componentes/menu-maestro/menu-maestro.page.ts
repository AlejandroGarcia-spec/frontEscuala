import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  imports: [IonicModule,CommonModule, FormsModule],
  selector: 'app-menu-maestro',
  templateUrl: './menu-maestro.page.html',
  styleUrls: ['./menu-maestro.page.scss'],
})
export class MenuMaestroPage {
rol: string = '';

  constructor(private router: Router) {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (usuario) {
      this.rol = usuario.rol;
    }
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil-maestro']);
  }

  navigateToVerAlumnos() {
    this.router.navigate(['/alumnos/lista']);
  }

  navigateToRegistraAsistencias() {
    this.router.navigate(['/asistencias/registro']);
  }

  navigateToEntradaQRAlumnos() {
    this.router.navigate(['/entradas/escanear-qr']);
  }

  navigateToSalidaQRAlumnos() {
    this.router.navigate(['/salidas/escanear-qr']);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/home']);
  }
}
