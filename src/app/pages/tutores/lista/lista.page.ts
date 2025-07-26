import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
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
    hijos: [
      { nombre: 'Luis Pérez', grado: '2°', codigo: '', qrGenerated: false, generandoQR: false },
      { nombre: 'Ana Pérez', grado: '3°', codigo: '', qrGenerated: false, generandoQR: false }
    ]
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  generarCodigo(index: number) {
    const codigoGenerado = Math.random().toString(36).substring(2, 8).toUpperCase(); 
    this.tutor.hijos[index].codigo = codigoGenerado;
  }

  cerrarSesion() {
    localStorage.removeItem('logueado');
    this.router.navigate(['/auth/login/tutor']);
  }

  trackByHijo(index: number, hijo: any): any {
    return hijo.id || index;
  }

  async generarCodigoQR(index: number) {
    try {
      this.tutor.hijos[index].generandoQR = true;

      const codigo = this.generarCodigoUnico();
      this.tutor.hijos[index].codigo = codigo;

      const datosQR = {
        codigo,
        nombreHijo: this.tutor.hijos[index].nombre,
        grado: this.tutor.hijos[index].grado,
        tutor: this.tutor.nombre,
        timestamp: Date.now(),
        validoHasta: Date.now() + (24 * 60 * 60 * 1000)
      };

      await this.generarQREnCanvas(JSON.stringify(datosQR), index);

      this.tutor.hijos[index].qrGenerated = true;
      this.tutor.hijos[index].generandoQR = false;

      this.mostrarToast('Código QR generado correctamente', 'success');
    } catch (error) {
      console.error('Error generando QR:', error);
      this.tutor.hijos[index].generandoQR = false;
      this.mostrarToast('Error al generar el código QR', 'danger');
    }
  }

  private generarCodigoUnico(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `${timestamp}${random}`.toUpperCase();
  }

  private async generarQREnCanvas(data: string, index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const canvas = document.getElementById(`qr-canvas-${index}`) as HTMLCanvasElement;
          if (!canvas) {
            reject(new Error('Canvas no encontrado'));
            return;
          }

          await QRCode.toCanvas(canvas, data, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            },
            errorCorrectionLevel: 'M'
          });

          resolve();
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  }

  async descargarQR(index: number) {
    try {
      const canvas = document.getElementById(`qr-canvas-${index}`) as HTMLCanvasElement;
      if (!canvas) {
        this.mostrarToast('Error: No se pudo acceder al código QR', 'danger');
        return;
      }

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = 400;
      tempCanvas.height = 400;

      const datosQR = {
        codigo: this.tutor.hijos[index].codigo,
        nombreHijo: this.tutor.hijos[index].nombre,
        grado: this.tutor.hijos[index].grado,
        tutor: this.tutor.nombre,
        timestamp: Date.now(),
        validoHasta: Date.now() + (24 * 60 * 60 * 1000)
      };

      await QRCode.toCanvas(tempCanvas, JSON.stringify(datosQR), {
        width: 400,
        margin: 3,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      tempCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `qr-${this.tutor.hijos[index].nombre}-${new Date().getTime()}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          this.mostrarToast('Código QR descargado', 'success');
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error descargando QR:', error);
      this.mostrarToast('Error al descargar el código QR', 'danger');
    }
  }

  async compartirQR(index: number) {
    try {
      const canvas = document.getElementById(`qr-canvas-${index}`) as HTMLCanvasElement;
      if (!canvas) {
        this.mostrarToast('Error: No se pudo acceder al código QR', 'danger');
        return;
      }

      canvas.toBlob(async (blob) => {
        if (blob && navigator.share) {
          try {
            const file = new File([blob], `qr-${this.tutor.hijos[index].nombre}.png`, {
              type: 'image/png'
            });

            await navigator.share({
              title: `Código QR - ${this.tutor.hijos[index].nombre}`,
              text: `Código de acceso para ${this.tutor.hijos[index].nombre}`,
              files: [file]
            });

            this.mostrarToast('Código QR compartido', 'success');
          } catch (error) {
            const err = error as any;
            if (err.name !== 'AbortError') {
              console.error('Error compartiendo:', error);
              this.compartirQRFallback(index);
            }
          }
        } else {
          this.compartirQRFallback(index);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error compartiendo QR:', error);
      this.mostrarToast('Error al compartir el código QR', 'danger');
    }
  }

  compartirQRFallback(index: number) {
    this.mostrarToast('Este navegador no permite compartir archivos directamente', 'warning');
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}