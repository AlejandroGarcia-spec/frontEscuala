import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-grupo-modal',
  imports: [IonicModule, FormsModule,ReactiveFormsModule,CommonModule],
  standalone: true,
  templateUrl: './eliminar-grupo-modal.page.html',
  styleUrls: ['./eliminar-grupo-modal.page.scss'],
})
export class EliminarGrupoModalPage  {
  eliminarForm!: FormGroup;
  carreras: any[] = [];
  grupos: any[] = [];
constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadCarreras();
    this.eliminarForm = this.formBuilder.group({
      selectedCarreraId: ['', Validators.required],
      grupoCarreraId: ['', Validators.required]
    });
  }

  loadCarreras() {

  }

  onCarreraChange(event: any) {

  }

  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este grupo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarGrupo(this.eliminarForm.get('grupoCarreraId')?.value);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarGrupo(id: number) {
    
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
