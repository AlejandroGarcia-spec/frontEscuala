import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { GrupoService } from 'src/app/core/services/grupo.service';

@Component({
  selector: 'app-agregar-grupo-modal',
  standalone: true,
  imports: [IonicModule,CommonModule,FormsModule],
  templateUrl: './agregar-grupo-modal.page.html',
  styleUrls: ['./agregar-grupo-modal.page.scss'],
})
export class AgregarGrupoModalPage  {
nombre: string = '';
selectedCarreraId: any;
constructor(private modalController: ModalController,
  private toastController: ToastController,
  private grupoService: GrupoService
  ) {
  }
agregarGrupo() {
  if (!this.nombre.trim()) {
    this.mostrarToast2();
    return;
  }

  this.grupoService.crearGrupo({ nombre: this.nombre.toUpperCase() }).subscribe({
    next: (res) => {
      this.mostrarToast();
      this.cerrarModal();
    },
    error: (err) => {
      console.error(err);
      this.mostrarToast2();
    },
  });
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

  cerrarModal() {
    this.modalController.dismiss();
  }


}
