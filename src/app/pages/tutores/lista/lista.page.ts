import { FormularioModalComponent } from '../../../modal/formulario-modal/formulario-modal.component';
import { FamiliaresModalComponent } from '../../../modal/familiares-modal/familiares-modal.component';
import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IonicModule, ToastController, ModalController, AlertController, ActionSheetController, ActionSheetButton } from '@ionic/angular';
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
  @ViewChildren('qrCanvas') qrCanvases!: QueryList<ElementRef<HTMLCanvasElement>>;

  // Lista original de alumnos con la propiedad generandoQR añadida
  tutor = {
    nombre: 'Juan Pérez',
    apellido: 'Pérez',
    foto: null, // Puedes agregar foto del tutor si la necesitas
    hijos: [
      { 
        nombre: 'Luis Pérez', 
        grado: '2°', 
        codigo: '', 
        qrGenerated: false, 
        generandoQR: false,
        datosQR: null as null | {
          estudiante: { nombre: string; grado: string; },
          autorizadoRecoger: { nombre: any; apellido: any; tipo: any; foto: any; },
          fechaGeneracion: string,
          codigoUnico: string
        } // Para guardar info del QR generado
      },
      { 
        nombre: 'Ana Pérez', 
        grado: '3°', 
        codigo: '', 
        qrGenerated: false, 
        generandoQR: false,
        datosQR: null as null | {
          estudiante: { nombre: string; grado: string; },
          autorizadoRecoger: { nombre: any; apellido: any; tipo: any; foto: any; },
          fechaGeneracion: string,
          codigoUnico: string
        } // Para guardar info del QR generado
      }
    ]
  };

  // Lista para familiares externos
  familiaresExternos: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}


  generarCodigo(index: number) {
    const codigoGenerado = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.tutor.hijos[index].codigo = codigoGenerado;
  }




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

  // Método principal para generar QR - ahora abre ActionSheet
  async generarCodigoQR(index: number) {
    const hijo = this.tutor.hijos[index];
    
    // Crear las opciones del ActionSheet
    // Removed misplaced import for ActionSheetButton

    const buttons: ActionSheetButton[] = [
      {
        text: `${this.tutor.nombre} ${this.tutor.apellido} (Tutor)`,
        icon: 'person-circle',
        handler: () => {
          this.generarQRParaPersona(index, {
            nombre: this.tutor.nombre,
            apellido: this.tutor.apellido,
            foto: this.tutor.foto,
            tipo: 'tutor'
          });
        }
      }
    ];

    // Agregar familiares a las opciones
    this.familiaresExternos.forEach((familiar, familiarIndex) => {
      buttons.push({
        text: `${familiar.nombre} ${familiar.apellido} (Familiar)`,
        icon: 'people',
        handler: () => {
          this.generarQRParaPersona(index, {
            nombre: familiar.nombre,
            apellido: familiar.apellido,
            foto: familiar.fotoBase64,
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
    } as ActionSheetButton);

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

    try {
      // Crear los datos del QR
      const datosQR = {
        estudiante: {
          nombre: hijo.nombre,
          grado: hijo.grado
        },
        autorizadoRecoger: {
          nombre: persona.nombre,
          apellido: persona.apellido,
          tipo: persona.tipo,
          foto: persona.foto
        },
        fechaGeneracion: new Date().toISOString(),
        codigoUnico: Math.random().toString(36).substr(2, 8).toUpperCase()
      };

      // Convertir a JSON string para el QR
      const qrData = JSON.stringify(datosQR);

      // Generar el QR en el canvas
      setTimeout(async () => {
        const canvas = document.getElementById(`qr-canvas-${hijoIndex}`) as HTMLCanvasElement;
        if (canvas) {
          await QRCode.toCanvas(canvas, qrData, {
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
          hijo.datosQR = datosQR;

          this.mostrarToast(`QR generado para ${persona.nombre} ${persona.apellido}`, 'success');
        }
      }, 1000);

    } catch (error) {
      console.error('Error generando QR:', error);
      hijo.generandoQR = false;
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

  descargarQR(index: number) {
    const canvas = document.getElementById(`qr-canvas-${index}`) as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `QR-${this.tutor.hijos[index].nombre}.png`;
      link.href = canvas.toDataURL();
      link.click();
      this.mostrarToast('QR descargado', 'success');
    }
  }

  async compartirQR(index: number) {
    const canvas = document.getElementById(`qr-canvas-${index}`) as HTMLCanvasElement;
    if (canvas && navigator.share) {
      try {
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `QR-${this.tutor.hijos[index].nombre}.png`, { type: 'image/png' });
            await navigator.share({
              title: `QR de ${this.tutor.hijos[index].nombre}`,
              files: [file]
            });
          }
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
