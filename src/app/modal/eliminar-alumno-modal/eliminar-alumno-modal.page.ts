import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AlumnosService } from 'src/app/core/services/alumnos.service';

@Component({
  selector: 'app-eliminar-alumno-modal',
  templateUrl: './eliminar-alumno-modal.page.html',
  standalone: true,
  imports: [IonicModule,ReactiveFormsModule, CommonModule],
  styleUrls: ['./eliminar-alumno-modal.page.scss'],
})
export class EliminarAlumnoModalPage  {
formEliminar!: FormGroup;
alumnos: any[] = []; // Lista de alumnos para el select
constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private alumnosService: AlumnosService,
       private http: HttpClient
  ) { }
   ngOnInit() {
    this.formEliminar = this.fb.group({
      id: ['', Validators.required]
    });
    this.cargarAlumnos();
  }


cargarAlumnos() {
  this.alumnosService.obtenerAlumnos().subscribe({
    next: (res: any) => {
      this.alumnos = res;
    },
    error: async (err) => {
      const toast = await this.toastController.create({
        message: 'Error al cargar alumnos',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  });
}
async confirmarEliminacion() {
  const alumnoId = this.formEliminar.value.id;
  const alumnoSeleccionado = this.alumnos.find(a => a.id === alumnoId);

  if (!alumnoId || !alumnoSeleccionado) {
    const toast = await this.toastController.create({
      message: 'No se ha seleccionado un alumno válido ❌',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
    return;
  }

  const alert = await this.alertController.create({
    header: 'Confirmar Eliminación',
    message: `¿Estás seguro de que deseas eliminar a ${alumnoSeleccionado.nombre} ${alumnoSeleccionado.apellido}?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.eliminarInstructor(alumnoId);
        },
      },
    ],
  });

  await alert.present();
}

  eliminarInstructor(id: number) {
this.alumnosService.eliminarAlumno(id).subscribe({
  next: () => {
    this.mostrarToastSuccess('Alumno eliminado con éxito');
    this.cerrarModal();
  },
  error: () => this.mostrarToastError('Error al eliminar el alumno')
});

  }

  cerrarModal() {
    this.modalController.dismiss();
  }
    async mostrarToastSuccess(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
    position: 'top',
    color: 'success'
  });
  toast.present();
}

async mostrarToastError(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
    position: 'top',
    color: 'danger'
  });
  toast.present();
}
}
