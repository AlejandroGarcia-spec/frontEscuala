import { Component, } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule]
})
export class ListaPage  {
 tutor = {
    nombre: 'Juan Pérez',
    hijos: [
      { nombre: 'Luis Pérez', grado: '2°', codigo: '' },
      { nombre: 'Ana Pérez', grado: '3°', codigo: '' }
    ]
  };

  constructor(private router: Router) {}


  generarCodigo(index: number) {
    const codigoGenerado = Math.random().toString(36).substring(2, 8).toUpperCase(); 
    this.tutor.hijos[index].codigo = codigoGenerado;
  }

  cerrarSesion() {
    localStorage.removeItem('logueado');
    this.router.navigate(['/auth/login/tutor']);
  }
}


