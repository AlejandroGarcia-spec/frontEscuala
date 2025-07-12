import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-tutor-modal',
  standalone: true,
  imports: [IonicModule,CommonModule,ReactiveFormsModule],
  templateUrl: './eliminar-tutor-modal.page.html',
  styleUrls: ['./eliminar-tutor-modal.page.scss'],
})
export class EliminarTutorModalPage {
  formEliminar!: FormGroup;
  instructores: any[] = []
  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }
   ngOnInit() {
    this.formEliminar = this.fb.group({
      id: ['', Validators.required]
    });
    this.obtenerInstructores();
  }

  obtenerInstructores() {

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
    
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
