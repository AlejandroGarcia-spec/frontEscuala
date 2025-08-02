import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/api.service';

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

  constructor(private api: ApiService) {}

ngOnInit() {
  const usuario = JSON.parse(localStorage.getItem('usuario')!);
  if (usuario && usuario.rol === 'maestro') {
    this.obtenerGrupoPorCorreo(usuario.correo);
  }
}

 obtenerGrupoPorCorreo(correo: string) {
  this.api.getPerfilMaestroPorCorreo(correo).subscribe({
    next: (maestro) => {
      this.idGrupo = maestro.grupoId;
      this.obtenerAlumnosPorGrupo();
    },
    error: (err) => {
      console.error('Error al obtener el perfil del maestro:', err);
    }
  });
}
obtenerAlumnosPorGrupo() {
  this.api.getAlumnosPorGrupo(this.idGrupo).subscribe({
    next: (alumnos) => {
      console.log('Alumnos obtenidos:', alumnos);
      this.instructores = alumnos;
      this.instructoresFiltrados = [...alumnos];
      this.ordenarPorApellido();
    },
    error: (err) => {
      console.error('Error al obtener los alumnos:', err);
    }
  });
}

buscarAlumnos() {
  const term = this.searchTerm.toLowerCase();

  this.instructoresFiltrados = this.instructores.filter(alumno =>
    alumno.nombre.toLowerCase().includes(term) ||
    alumno.apellido.toLowerCase().includes(term) ||
    alumno.correo.toLowerCase().includes(term)
  );
}



  ordenarPorApellido() {
    this.instructoresFiltrados.sort((a, b) => a.apellido.localeCompare(b.apellido));
  }
}
