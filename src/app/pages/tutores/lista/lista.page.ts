import { FormularioModalComponent } from '../../../modal/formulario-modal/formulario-modal.component';
import { FamiliaresModalComponent } from '../../../modal/familiares-modal/familiares-modal.component';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicModule, ToastController, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListaPage {

  tutor = {
    nombre: 'Juan Pérez',
    apellido: 'Pérez',
    hijos: [
      { 
        nombre: 'Luis Pérez', 
        grado: '2°', 
        codigo: '', 
        qrGenerated: false, 
        generandoQR: false,
        qrDataUrl: '', // Para almacenar la imagen del QR en base64
        datosQR: null as null | {
          estudiante: { nombre: string; grado: string; },
          autorizadoRecoger: { nombre: any; apellido: any; tipo: any; parentesco: any; foto: any; },
          fechaGeneracion: string,
          codigoUnico: string
        } // Para guardar info completa del QR generado
      },
      { 
        nombre: 'Ana Pérez', 
        grado: '3°', 
        codigo: '', 
        qrGenerated: false, 
        generandoQR: false,
        qrDataUrl: '', // Para almacenar la imagen del QR en base64
        datosQR: null as null | {
          estudiante: { nombre: string; grado: string; },
          autorizadoRecoger: { nombre: any; apellido: any; tipo: any; parentesco: any; foto: any; },
          fechaGeneracion: string,
          codigoUnico: string
        } // Para guardar info completa del QR generado
      }
    ]
  };

  // Lista para familiares externos (mantenida para el modal)
  familiaresExternos: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private cdr: ChangeDetectorRef
  ) {}

  // Método trackBy requerido por el template
  trackByHijo(index: number, hijo: any): any {
    return index;
  }

  mantenerEnCodigos(event: Event) {
    event.preventDefault();
    console.log('Permaneciendo en página de códigos');
  }

  // Método para abrir modal de familiares
  async abrirModalFamiliares(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    const modal = await this.modalCtrl.create({
      component: FamiliaresModalComponent,
      componentProps: {
        familiares: this.familiaresExternos
      }
    });

    await modal.present();
  }

  // Método para registrar familiares externos
  async abrirRegistroFamiliar() {
    const modal = await this.modalCtrl.create({
      component: FormularioModalComponent
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data?.familiar) {
        // Convertir la foto a base64 si existe
        if (data.familiar.foto) {
          this.convertirFotoABase64(data.familiar.foto).then(base64 => {
            data.familiar.fotoBase64 = base64;
            this.familiaresExternos.push(data.familiar);
            this.mostrarToast('Familiar registrado exitosamente', 'success');
          });
        } else {
          this.familiaresExternos.push(data.familiar);
          this.mostrarToast('Familiar registrado exitosamente', 'success');
        }
      }
    });

    await modal.present();
  }

  // Convertir archivo de foto a base64
  private convertirFotoABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Método principal para generar QR 
  async generarCodigoQR(index: number) {
    const hijo = this.tutor.hijos[index];
    
    // Crear las opciones del ActionSheet
    const buttons: any[] = [
      {
        text: `${this.tutor.nombre} ${this.tutor.apellido} (Tutor)`,
        icon: 'person-circle',
        handler: () => {
          this.generarQRParaPersona(index, {
            nombre: this.tutor.nombre,
            apellido: this.tutor.apellido,
            foto: null,
            tipo: 'tutor'
          });
        }
      }
    ];

    // Agregar familiares a las opciones
    this.familiaresExternos.forEach((familiar) => {
      buttons.push({
        text: `${familiar.nombre} ${familiar.apellido} (${familiar.parentesco})`,
        icon: 'people',
        handler: () => {
          this.generarQRParaPersona(index, {
            nombre: familiar.nombre,
            apellido: familiar.apellido,
            parentesco: familiar.parentesco,
            foto: familiar.fotoBase64 || null,
            tipo: 'familiar'
          });
        }
      });
    });

    // Botón cancelar
    buttons.push({
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel'
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: `Generar QR para ${hijo.nombre}`,
      subHeader: '¿Quién va a recoger al estudiante?',
      buttons: buttons
    });

    await actionSheet.present();
  }

  // Generar QR para la persona seleccionada
  async generarQRParaPersona(hijoIndex: number, persona: any) {
    const hijo = this.tutor.hijos[hijoIndex];
    hijo.generandoQR = true;
    this.cdr.detectChanges();

    try {
      // Crear los datos del QR con información completa
      const datosQR = {
        estudiante: {
          nombre: hijo.nombre,
          grado: hijo.grado
        },
        autorizadoRecoger: {
          nombre: persona.nombre,
          apellido: persona.apellido,
          tipo: persona.tipo,
          parentesco: persona.parentesco || 'tutor', // Si es tutor, usar 'tutor', si no, el parentesco
          foto: persona.foto
        },
        fechaGeneracion: new Date().toISOString(),
        codigoUnico: Math.random().toString(36).substr(2, 8).toUpperCase()
      };

      // Convertir a JSON string para el QR
      const qrData = JSON.stringify(datosQR);

      console.log('Generando QR con datos:', datosQR);

      // Generar el QR como imagen base64
      const qrDataUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // Actualizar el estado del hijo
      hijo.codigo = datosQR.codigoUnico;
      hijo.qrGenerated = true;
      hijo.generandoQR = false;
      hijo.qrDataUrl = qrDataUrl;
      hijo.datosQR = datosQR; // Guardar los datos completos para mostrar información

      this.cdr.detectChanges();
      this.mostrarToast(`QR generado para ${persona.nombre} ${persona.apellido}`, 'success');

    } catch (error) {
      console.error('Error generando QR:', error);
      hijo.generandoQR = false;
      this.cdr.detectChanges();
      this.mostrarToast('Error al generar el QR', 'danger');
    }
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

  // Descargar QR simplificado
  descargarQR(index: number) {
    const hijo = this.tutor.hijos[index];
    if (hijo.qrDataUrl) {
      const link = document.createElement('a');
      link.download = `QR-${hijo.nombre}.png`;
      link.href = hijo.qrDataUrl;
      link.click();
      this.mostrarToast('QR descargado', 'success');
    }
  }

  // Compartir QR simplificado
  async compartirQR(index: number) {
    const hijo = this.tutor.hijos[index];
    if (hijo.qrDataUrl && navigator.share) {
      try {
        // Convertir data URL a blob
        const response = await fetch(hijo.qrDataUrl);
        const blob = await response.blob();
        const file = new File([blob], `QR-${hijo.nombre}.png`, { type: 'image/png' });
        
        await navigator.share({
          title: `QR de ${hijo.nombre}`,
          files: [file]
        });
      } catch (error) {
        this.mostrarToast('Error al compartir', 'danger');
      }
    } else {
      this.mostrarToast('Compartir no disponible en este dispositivo', 'warning');
    }
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