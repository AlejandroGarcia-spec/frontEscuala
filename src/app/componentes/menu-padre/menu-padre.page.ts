import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  imports:[IonicModule,CommonModule,FormsModule],
  standalone:true,
  selector: 'app-menu-padre',
  templateUrl: './menu-padre.page.html',
  styleUrls: ['./menu-padre.page.scss'],
})
export class MenuPadrePage  {

rol: string = '';

  constructor(private router: Router) {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (usuario) {
      this.rol = usuario.rol;
    }
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil-padre']);
  }

  navigateToCredencialHijos() {
    this.router.navigate(['/perfil-alumno']);
  }
  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/home']);
  }
}
 