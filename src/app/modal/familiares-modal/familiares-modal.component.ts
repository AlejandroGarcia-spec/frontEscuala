import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormularioModalComponent } from '../formulario-modal/formulario-modal.component';

@Component({
  selector: 'app-familiares-modal',
  templateUrl: './familiares-modal.component.html',
  styleUrls: ['./familiares-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FamiliaresModalComponent {
  @Input() familiares: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  // Cerrar el modal
  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  // Abrir modal para agregar familiar (reutiliza tu modal existente)
  async abrirRegistroFamiliar() {
    const modal = await this.modalCtrl.create({
      component: FormularioModalComponent
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data?.familiar) {
        this.familiares.push(data.familiar);
        this.mostrarToast('Familiar registrado exitosamente', 'success');
      }
    });

    await modal.present();
  }

  // Eliminar familiar con confirmación
  async eliminarFamiliar(index: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Familiar',
      message: `¿Estás seguro de que quieres eliminar a ${this.familiares[index].nombre} ${this.familiares[index].apellido}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.familiares.splice(index, 1);
            this.mostrarToast('Familiar eliminado', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}