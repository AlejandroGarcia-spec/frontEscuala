import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AgregarAlumnoModalPage } from 'src/app/modal/agregar-alumno-modal/agregar-alumno-modal.page';
import { EditarAlumnoModalPage } from 'src/app/modal/editar-alumno-modal/editar-alumno-modal.page';
import { EliminarAlumnoModalPage } from 'src/app/modal/eliminar-alumno-modal/eliminar-alumno-modal.page';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { GrupoService } from 'src/app/core/services/grupo.service';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class FormularioPage {
  formTutoria!: FormGroup;
  isEdit: boolean = false;
  id!: number;
  selectedFile: File | null = null;
  grupos: any[] = [];
  alumnos: any[] = [];
  alumnosFiltrados: any[] = [];
  grupoSeleccionado: number | null = null;
  searchTerm: string = '';


  constructor(
    private readonly fb: FormBuilder,
    private readonly toastController: ToastController,
    private readonly modalController: ModalController,
    private readonly grupoService: GrupoService,
    private readonly alumnoService: AlumnosService,
    private readonly alertController: AlertController

  ) {
    this.obtenerGrupos();
    this.obtenerAlumnos();
  }
  obtenerGrupos() {
    this.grupoService.obtenerGrupos().subscribe((res) => {
      this.grupos = res as any[];
    });
  }
  obtenerAlumnos() {
    this.alumnoService.obtenerAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.filtrarAlumnosPorGrupo(); // ✅ Se actualiza después de cargar
      },
      error: (error) => {
        console.error('Error al obtener alumnos:', error);
      }
    });
  }

  // Reemplaza el método buscarAlumnos() existente con este:
  buscarAlumnos() {
    const term = this.searchTerm.toLowerCase();

    if (this.grupoSeleccionado) {
      // Primero filtra por grupo, luego por término de búsqueda
      const alumnosDelGrupo = this.alumnos.filter(alumno => {
        if (!alumno.grupo) return false;
        if (typeof alumno.grupo === 'number') return alumno.grupo === this.grupoSeleccionado;
        if (typeof alumno.grupo === 'object') return alumno.grupo.id === this.grupoSeleccionado;
        return false;
      });

      // Luego filtra por término de búsqueda
      this.alumnosFiltrados = alumnosDelGrupo.filter(alumno =>
        alumno.nombre.toLowerCase().includes(term) ||
        alumno.apellido.toLowerCase().includes(term)
      );
    } else {
      // Si no hay grupo seleccionado, buscar en todos los alumnos
      this.alumnosFiltrados = this.alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(term) ||
        alumno.apellido.toLowerCase().includes(term)
      );
    }
  }


  // También actualiza el método filtrarAlumnosPorGrupo() para que funcione mejor con la búsqueda:
  filtrarAlumnosPorGrupo() {
    if (this.grupoSeleccionado) {
      this.alumnosFiltrados = this.alumnos.filter(alumno => {
        if (!alumno.grupo) return false;
        if (typeof alumno.grupo === 'number') return alumno.grupo === this.grupoSeleccionado;
        if (typeof alumno.grupo === 'object') return alumno.grupo.id === this.grupoSeleccionado;
        return false;
      });
    } else {
      this.alumnosFiltrados = [...this.alumnos]; // Muestra todos los alumnos si no hay grupo seleccionado
    }

    // Si hay un término de búsqueda activo, aplicar el filtro
    if (this.searchTerm) {
      this.buscarAlumnos();
    }
  }

  limpiarFiltros() {
    this.searchTerm = '';
    this.grupoSeleccionado = null;
    this.alumnosFiltrados = [...this.alumnos];
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }


  convertToUpperCase(event: any, controlName: string) {
    const value = event.target.value.toUpperCase();
    this.formTutoria.get(controlName)?.setValue(value);
  }
  async abrirModalAgregarAlumno() {
    const modal = await this.modalController.create({
      component: AgregarAlumnoModalPage,
      componentProps: {
        alumnos: this.alumnos
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.obtenerAlumnos();
    });

  }

  async abrirModalEditarAlumno(alumno: any) {
    const modal = await this.modalController.create({
      component: EditarAlumnoModalPage,
      componentProps: {
        alumnoSeleccionado: alumno
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.obtenerAlumnos();
    });

  }

  async eliminarAlumno(alumno: any) {
    const alert = await this.alertController.create({
      header: '⚠️ Confirmar Eliminación',
      subHeader: `${alumno.nombre} ${alumno.apellido}`,
      message: '¿Estás seguro de que quieres eliminar este alumno? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
            // No hacer nada si cancela
          }
        },
        {
          text: 'Eliminar',
          cssClass: 'alert-button-delete',
          handler: async () => {
            // Mostrar loading
            const loading = await this.toastController.create({
              message: 'Eliminando alumno...',
              duration: 1000
            });
            await loading.present();

            // Llamar al servicio para eliminar
            this.alumnoService.eliminarAlumno(alumno.id).subscribe({
              next: async () => {
                const toast = await this.toastController.create({
                  message: `✅ ${alumno.nombre} ${alumno.apellido} eliminado correctamente`,
                  duration: 2500,
                  color: 'success',
                  position: 'bottom'
                });
                toast.present();
                this.obtenerAlumnos(); // Refrescar la lista
              },
              error: async (error) => {
                const toast = await this.toastController.create({
                  message: '❌ Error al eliminar el alumno',
                  duration: 2500,
                  color: 'danger',
                  position: 'bottom'
                });
                toast.present();
                console.error('Error al eliminar alumno:', error);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
