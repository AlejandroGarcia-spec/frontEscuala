import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-alumno-modal',
  templateUrl: './eliminar-alumno-modal.page.html',
  standalone: true,
  imports: [IonicModule,ReactiveFormsModule, CommonModule],
  styleUrls: ['./eliminar-alumno-modal.page.scss'],
})
export class EliminarAlumnoModalPage  {
formEliminar!: FormGroup;
  alumnos: any[] = []
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
    this.obtenerAlumnos();
  }

  obtenerAlumnos() {

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
