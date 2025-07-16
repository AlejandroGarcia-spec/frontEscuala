import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-grupo-modal',
  standalone: true,
  imports: [IonicModule,CommonModule,FormsModule],
  templateUrl: './agregar-grupo-modal.page.html',
  styleUrls: ['./agregar-grupo-modal.page.scss'],
})
export class AgregarGrupoModalPage  {
nombre: string = '';
carreras: any[] = [];
selectedCarreraId: any;
constructor(private modalController: ModalController,
    private toastController: ToastController,
  ) {
    this.loadCarreras();
  }
  loadCarreras() {

  }


  agregarGrupo() {

  }

  async mostrarToast() {
    const toast = await this.toastController.create({
      message: `Grupo ${this.nombre.toUpperCase()} creado de manera exitosa`,
      duration: 2000,
      position:'top',
      color: 'success'
    });
    toast.present();
  }
  async mostrarToast2() {
    const toast = await this.toastController.create({
      message: `Grupo ${this.nombre.toUpperCase()}  no creado de manera exitosa`,
      duration: 2000,
      position:'top',
      color: 'danger'
    });
    toast.present();
  }


  getCarreraNombre() {
    return this.carreras.find(carrera => carrera.id === this.selectedCarreraId)?.nombre || "";
  }


  cerrarModal() {
    this.modalController.dismiss();
  }


}
