import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { ApiService } from 'src/app/core/services/api.service';
import { AsistenciasService } from 'src/app/core/services/asistencias.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  imports: [IonicModule, FormsModule, CommonModule, FooterPage],
  standalone: true,
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  instructoresFiltrados: any[] = [];
  asistencias: { alumno_id: number; presente: boolean; registrada: boolean }[] = [];
  idGrupo: number = 0;

  constructor(private api: ApiService,
    private asistenciasService: AsistenciasService,
   private toastController: ToastController) {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (usuario && usuario.rol === 'maestro') {
      this.obtenerGrupoPorCorreo(usuario.correo);
    }
  }

  obtenerAlumnosPorGrupo() {
    this.api.getAlumnosPorGrupo(this.idGrupo).subscribe({
      next: (alumnos) => {
        this.instructoresFiltrados = [...alumnos];
        this.asistencias = this.instructoresFiltrados.map(alumno => ({
          alumno_id: alumno.id,
          presente: false,
          registrada: false,
        }));
      },
      error: (err) => {
        console.error('Error al obtener los alumnos:', err);
      }
    });
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
marcarAsistencia(index: number, presente: boolean) {
  if (this.asistencias[index]) {
    this.asistencias[index].presente = presente;

    if (presente && !this.asistencias[index].registrada) {
      this.asistenciasService.registrarEntrada(this.asistencias[index].alumno_id).subscribe({
        next: () => {
          this.asistencias[index].registrada = true;
        },
        error: (err) => {
          if (err.status === 409) {
            alert(`El alumno con ID ${this.asistencias[index].alumno_id} ya tiene asistencia registrada hoy.`);
            this.asistencias[index].registrada = true;
          } else {
            alert(`Error al registrar asistencia para alumno ID ${this.asistencias[index].alumno_id}`);
            console.error(err);
          }
        }
      });
    }
  }
}

  guardarAsistencias() {
    const alumnosPresentes = this.asistencias.filter(a => a.presente && !a.registrada);

    if (alumnosPresentes.length === 0) {
      alert('No hay asistencias nuevas para registrar.');
      return;
    }

    alumnosPresentes.forEach(a => {
      this.asistenciasService.registrarEntrada(a.alumno_id).subscribe({
 next: () => {
  a.registrada = true;
  this.mostrarToast(`Asistencia registrada para el alumno ID ${a.alumno_id}`);
},

error: (err) => {
  if (err.status === 409) {
    this.mostrarToast(`El alumno con ID ${a.alumno_id} ya tiene asistencia registrada hoy.`, 'warning');
    a.registrada = true;
  } else {
    this.mostrarToast(`Error al registrar asistencia para alumno ID ${a.alumno_id}`, 'danger');
    console.error(err);
  }
}

});
    });
  }
  async mostrarToast(mensaje: string, color: string = 'success') {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
    color: color,
    position: 'bottom'
  });
  await toast.present();
}

}
