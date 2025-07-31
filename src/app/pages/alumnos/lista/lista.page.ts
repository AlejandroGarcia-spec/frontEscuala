import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [IonicModule, FooterPage, CommonModule, FormsModule, HttpClientModule],
})
export class ListaPage implements OnInit {

  instructores: any[] = [];
  instructoresFiltrados: any[] = [];
  searchTerm: string = '';
  idGrupo: number = 0;

  constructor() {}

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (usuario && usuario.id_grupo) {
      this.idGrupo = usuario.id_grupo;
      this.obtenerAlumnosPorGrupo();
    }
  }

  obtenerAlumnosPorGrupo() {
 
  }

  buscarAlumnos() {
    const term = this.searchTerm.toLowerCase();
    this.instructoresFiltrados = this.instructores.filter(alumno =>
      alumno.nombre.toLowerCase().includes(term) ||
      alumno.apellido1.toLowerCase().includes(term) ||
      alumno.email.toLowerCase().includes(term)
    );
  }

  ordenarPorApellido() {
    this.instructoresFiltrados.sort((a, b) => a.apellido1.localeCompare(b.apellido1));
  }
}
