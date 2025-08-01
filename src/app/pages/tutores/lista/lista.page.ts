import { FormularioModalComponent } from '../../../modal/formulario-modal/formulario-modal.component';
import { Component } from '@angular/core';
import { IonicModule, ToastController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListaPage {
  // Lista original de alumnos con la propiedad generandoQR añadida
  tutor = {
    nombre: 'Juan Pérez',
    hijos: [
      { 
        nombre: 'Luis Pérez', 
        grado: '2°', 
        codigo: '', 
        qrGenerated: false, 
        generandoQR: false // Propiedad añadida
      },
      { 
        nombre: 'Ana Pérez', 
        grado: '3°', 
        codigo: '', 
        qrGenerated: false, 
        generandoQR: false // Propiedad añadida
      }
    ]
  };

  // Lista para familiares externos
  familiaresExternos: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) {}

  // Método trackBy requerido por el template
  trackByHijo(index: number, hijo: any): any {
    return index; // O puedes usar hijo.id si existe
  }

  // Método para registrar familiares externos
  async abrirRegistroFamiliar() {
    const modal = await this.modalCtrl.create({
      component: FormularioModalComponent
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data?.familiar) {
        this.familiaresExternos.push(data.familiar);
        this.mostrarToast('Familiar registrado exitosamente', 'success');
      }
    });

    await modal.present();
  }

  // Método para cerrar sesión
  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          handler: () => {
            localStorage.removeItem('logueado');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  // Métodos para manejo de QR (versiones simplificadas)
  async generarCodigoQR(index: number) {
    this.tutor.hijos[index].generandoQR = true;
    
    // Simulamos la generación del código
    setTimeout(() => {
      this.tutor.hijos[index].codigo = Math.random().toString(36).substr(2, 8).toUpperCase();
      this.tutor.hijos[index].qrGenerated = true;
      this.tutor.hijos[index].generandoQR = false;
      this.mostrarToast('Código QR generado', 'success');
    }, 1500);
  }

  descargarQR(index: number) {
    this.mostrarToast('Descarga de QR no implementada', 'warning');
  }

  compartirQR(index: number) {
    this.mostrarToast('Compartir QR no implementado', 'warning');
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