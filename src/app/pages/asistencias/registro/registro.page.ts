import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
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
asistencias: { id?: number; alumno_id: number; presente: boolean; registrada: boolean }[] = [];
  idGrupo: number = 0;

  constructor(private readonly api: ApiService,
    private readonly asistenciasService: AsistenciasService,
   private readonly toastController: ToastController,
    private alertController: AlertController,) {
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
obtenerEntradasRegistradas() {
  this.asistenciasService.getEntradasPorGrupo(this.idGrupo).subscribe({
    next: (entradas) => {
      this.asistencias = this.instructoresFiltrados.map(alumno => {
        const entrada = entradas.find(e => e.alumno.id === alumno.id);
        return {
          id: entrada?.id || 0,
          alumno_id: alumno.id,
          presente: !!entrada,
          registrada: !!entrada,
        };
      });
    },
    error: (err) => {
      console.error('Error al obtener entradas:', err);
    }
  });
}
modificarAsistencia(entrada: any, presente: boolean) {
  if (!entrada.id) {
    // No existe la entrada, crear una nueva (igual que antes)
    this.asistenciasService.registrarEntrada(entrada.alumno_id).subscribe({
      next: () => {
        entrada.presente = true;
        entrada.registrada = true;
        this.mostrarToast('Asistencia registrada');
      },
      error: (err) => {
        this.mostrarToast('Error al registrar asistencia', 'danger');
      },
    });
  } else {
    if (!presente) {
      // Si desmarca, eliminar asistencia
      this.eliminarEntrada(entrada.id);
    } else {
      // Si quieres permitir cambiar datos, implementa update aquí.
      // Por ahora, solo dejamos toggle para eliminar o crear.
    }
  }
}
toggleAsistencia(entrada: any, presente: boolean) {
  if (presente) {
    // Registrar asistencia si no está registrada
    if (!entrada.registrada) {
      this.asistenciasService.registrarEntrada(entrada.alumno_id).subscribe({
        next: (respuesta) => {
          entrada.presente = true;
          entrada.registrada = true;
          entrada.id = respuesta.id; // guardamos el id de la asistencia registrada
          this.mostrarToast('Asistencia registrada');
        },
        error: (err) => {
          if (err.status === 409) {
            this.mostrarToast('Asistencia ya registrada', 'warning');
            entrada.registrada = true;
            entrada.presente = true;
          } else {
            this.mostrarToast('Error al registrar asistencia', 'danger');
          }
        }
      });
    }
  } else {
    // Si desactiva el toggle, no eliminar automáticamente, espera a que presione el botón Eliminar
    // Sólo actualizamos localmente el toggle para que refleje el estado real
    entrada.presente = true;
    this.mostrarToast('Para eliminar, usa el botón Eliminar', 'warning');
  }
}

eliminarAsistencia(entrada: any) {
  if (!entrada.id) {
    this.mostrarToast('No hay asistencia registrada para eliminar', 'warning');
    return;
  }
  this.asistenciasService.eliminarEntrada(entrada.id).subscribe({
    next: () => {
      entrada.presente = false;
      entrada.registrada = false;
      entrada.id = 0;
      this.mostrarToast('Asistencia eliminada');
    },
    error: (err) => {
      this.mostrarToast('Error al eliminar asistencia', 'danger');
      console.error(err);
    }
  });
}
 // Método modificado para pedir confirmación antes de eliminar
  async confirmarYEliminarEntrada(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Seguro que quieres eliminar esta asistencia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarEntrada(id);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarEntrada(id: number) {
    this.asistenciasService.eliminarEntrada(id).subscribe({
      next: () => {
        const idx = this.asistencias.findIndex(a => a.id === id);
        if (idx !== -1) {
          this.asistencias[idx].presente = false;
          this.asistencias[idx].registrada = false;
          this.asistencias[idx].id = 0;
        }
        this.mostrarToast('Asistencia eliminada');
      },
      error: (err) => {
        this.mostrarToast('Error al eliminar asistencia', 'danger');
        console.error(err);
      }
    });
  }
}
