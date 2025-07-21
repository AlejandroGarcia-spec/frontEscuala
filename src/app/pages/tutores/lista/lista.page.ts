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
 grupos: any[] = [];

  constructor(private router: Router) {
    // Simulación de grupos con tutores
    for (let i = 1; i <= 10; i++) {
      this.grupos.push({
        id: i,
        abierto: false,
        tutores: [
          { nombre: `Tutor A del Grupo ${i}` },
          { nombre: `Tutor B del Grupo ${i}` },
          { nombre: `Tutor C del Grupo ${i}` }
        
        ]
      });
    }
  }

  toggleGrupo(id: number) {
    const grupo = this.grupos.find(g => g.id === id);
    if (grupo) grupo.abierto = !grupo.abierto;
  }

  irAlFormulario() {
    this.router.navigate(['/tutores/formulario']);
  }
}


