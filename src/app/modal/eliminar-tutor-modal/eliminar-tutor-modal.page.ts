import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { TutoresService } from 'src/app/core/services/tutores.service';

@Component({
  selector: 'app-eliminar-tutor-modal',
  standalone: true,
  imports: [IonicModule,CommonModule,ReactiveFormsModule],
  templateUrl: './eliminar-tutor-modal.page.html',
  styleUrls: ['./eliminar-tutor-modal.page.scss'],
})
export class EliminarTutorModalPage {
  tutorId!: number;
  formEliminar!: FormGroup;
  instructores: any[] = []
  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private tutorService: TutoresService
  ) { }
   ngOnInit() {
    this.formEliminar = this.fb.group({
      id: ['', Validators.required]
    });
    this.obtenerTutores();
    if (this.tutorId) {
  this.formEliminar.patchValue({ id: this.tutorId });
}

  }

  obtenerTutores() {
    this.tutorService.obtenerTutores().subscribe({
      next: (res: any) => {
        this.instructores = res;
      },
      error: () => this.mostrarToast('Error al cargar tutores'),
    });
  }

 async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este instructor?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarInstructor();
          }
        }
      ]
    });

    await alert.present();
  }

 eliminarInstructor() {
  const id = this.formEliminar.value.id;
  if (!id) {
    this.mostrarToast('Selecciona un tutor válido para eliminar.');
    return;
  }

  this.tutorService.eliminarTutor(id).subscribe({
    next: () => {
      this.mostrarToast('Tutor eliminado correctamente.');
      this.cerrarModal();
    },
    error: () => {
      this.mostrarToast('Error al eliminar el tutor.');
    }
  });
}


  cerrarModal() {
    this.modalController.dismiss();
  }
}
