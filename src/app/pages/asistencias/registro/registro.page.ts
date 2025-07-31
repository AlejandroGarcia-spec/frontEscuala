import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  imports: [IonicModule,FormsModule, CommonModule], // Uncomment if you need Ionic components
  standalone: true,
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

    alumnos: any[] = [];
  asistencias: { alumno_id: number, presente: boolean }[] = [];
  idGrupo: number = 0;

  constructor(
  //  private alumnoService: AlumnoService,
   // private asistenciaService: AsistenciaService
  ) {const usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (usuario && usuario.id_grupo) {
      this.idGrupo = usuario.id_grupo;
      this.obtenerAlumnos();
    }
  }

  obtenerAlumnos() {

  }

  marcarAsistencia(index: number, valor: boolean) {
    this.asistencias[index].presente = valor;
  }

  guardarAsistencias() {
    const fecha = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
    const payload = this.asistencias.map(a => ({
      ...a,
      fecha
    }));

   // this.asistenciaService.registrarAsistencias(payload).subscribe(response => {
    //  console.log('Asistencias guardadas', response);
     // alert('✅ Asistencia registrada con éxito');
   // });
  }
}
