import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { IonicModule, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as QRCode from 'qrcode';

// Servicios
import { QrService } from 'src/app/core/services/qr.service';
import { TutoresService } from 'src/app/core/services/tutores.service';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { ConocidosService } from 'src/app/core/services/conocidos.service';

// Interfaces principales para la respuesta del backend

interface AutorizadoRecoger {
  nombre: string;
  apellido: string;
  tipo: 'tutor' | 'familiar';
  parentesco: string;
  id?: number;
}

interface DatosQR {
  estudiante: {
    id: number;
    nombre: string;
    grado: any;
  };
  autorizadoRecoger: AutorizadoRecoger;
  fechaGeneracion: string;
  fechaExpiracion: string;
  codigoUnico: string;
}

interface Hijo {
  id: number;
  nombre: string;
  apellido: string;
  grado: string;
  grupo?: any;
  codigo: string;
  qrGenerated: boolean;
  generandoQR: boolean;
  qrDataUrl: string;
  datosQR: DatosQR | null;
}

interface Tutor {
  id: number;
  nombre: string;
  apellido: string;
  telefono?: string;
  email?: string;
  hijos: Hijo[];
}

interface Familiar {
  id: number;
  nombre: string;
  apellido: string;
  parentesco: string;
  foto?: string | null;
  idConocido?: number;
}

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email?: string;
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListaPage implements OnInit, OnDestroy {

  tutor: Tutor | null = null;
  familiares: Familiar[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _qrService: QrService,
    private _tutoreService: TutoresService,
    private _alumnoService: AlumnosService,
    private _conocidoService: ConocidosService
  ) { }

  ngOnInit() {
    this.inicializarDatos();
    setInterval(() => this.verificarExpiracionQR(), 60000);
  }

  ngOnDestroy() {
    // Limpiar todas las suscripciones
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private inicializarDatos() {
    const usuario = this.obtenerUsuarioLocalStorage();
    if (!usuario?.id) {
      this.mostrarErrorYRedireccionar('No se encontró información del usuario');
      return;
    }

    this.cargarDatosTutor(usuario.id);
  }

  private obtenerUsuarioLocalStorage(): Usuario | null {
    try {
      const usuarioString = localStorage.getItem('usuario');
      return usuarioString ? JSON.parse(usuarioString) : null;
    } catch (error) {
      console.error('Error al parsear usuario de localStorage:', error);
      return null;
    }
  }

  private cargarDatosTutor(tutorId: number) {
    const tutorSub = this._tutoreService.obtenerTutorPorId(tutorId)
      .subscribe({
        next: (respuesta) => {
          this.tutor = respuesta;
          this.cargarHijos(tutorId);
          this.cargarFamiliaresExternos(tutorId);
        },
        error: (err) => {
          console.error('Error al obtener los datos del tutor:', err);
          this.mostrarToast('Error al cargar información del tutor', 'danger');
        }
      });

    this.subscriptions.push(tutorSub);
  }

  private cargarHijos(tutorId: number) {
    const hijosSub = this._alumnoService.obtenerPorTutor(tutorId)
      .subscribe({
        next: (hijos) => {
          if (this.tutor) {
            this.tutor.hijos = hijos.map((hijo: any) => ({
              ...hijo,
              codigo: '',
              qrGenerated: false,
              generandoQR: false,
              qrDataUrl: '',
              datosQR: null
            }));
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.error('Error al obtener hijos del tutor:', err);
          this.mostrarToast('Error al cargar información de los hijos', 'danger');
        }
      });

    this.subscriptions.push(hijosSub);
  }

  private cargarFamiliaresExternos(tutorId: number) {
    const familiaresSub = this._conocidoService.getByTutorId(tutorId)
      .subscribe({
        next: (familiares) => {
          this.familiares = familiares;
        },
        error: (err) => {
          console.error('Error al obtener familiares externos:', err);
          this.mostrarToast('Error al cargar familiares', 'warning');
        }
      });

    this.subscriptions.push(familiaresSub);
  }

  trackByHijo(index: number, hijo: Hijo): number {
    return hijo.id;
  }

  async generarCodigoQR(index: number) {
    if (!this.tutor || !this.tutor.hijos[index]) {
      this.mostrarToast('Error: No se encontró información del hijo', 'danger');
      return;
    }

    const hijo = this.tutor.hijos[index];

    try {
      const actionSheet = await this.crearActionSheet(hijo, index);
      await actionSheet.present();
    } catch (error) {
      console.error('Error al crear ActionSheet:', error);
      this.mostrarToast('Error al mostrar opciones', 'danger');
    }
  }

  private async crearActionSheet(hijo: Hijo, index: number) {
    const buttons: any[] = [];

    // Opción del tutor
    if (this.tutor) {
      buttons.push({
        text: `${this.tutor.nombre} ${this.tutor.apellido} (Tutor)`,
        icon: 'person-circle',
        handler: () => {
          this.generarQRParaPersona(index, {
            tipo: 'tutor',
            nombre: this.tutor!.nombre,
            apellido: this.tutor!.apellido,
            parentesco: 'Tutor',
          });
        }
      });
    }


    // Opciones de familiares
    this.familiares.forEach((familiar) => {
      buttons.push({
        text: `${familiar.nombre} ${familiar.apellido} (${familiar.parentesco || 'familiar'})`,
        icon: 'people',
        handler: () => {
          this.generarQRParaPersona(index, {
            tipo: 'familiar',
            id: familiar.id,
            nombre: familiar.nombre,
            apellido: familiar.apellido,
            parentesco: familiar.parentesco,
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

    return this.actionSheetCtrl.create({
      header: `Generar QR para ${hijo.nombre}`,
      subHeader: '¿Quién va a recoger al estudiante?',
      buttons: buttons
    });
  }

  async generarQRParaPersona(hijoIndex: number, persona: any) {
    if (!this.tutor || !this.tutor.hijos[hijoIndex]) {
      this.mostrarToast('Error: Datos no válidos', 'danger');
      return;
    }

    const hijo = this.tutor.hijos[hijoIndex];
    
    hijo.generandoQR = true;
    this.cdr.detectChanges();

    try {

      // Obtener datos del backend si es necesario
      let autorizado: AutorizadoRecoger;

      if (persona.tipo === 'tutor') {
        autorizado = {
          id: this.tutor.id,
          nombre: this.tutor.nombre,
          apellido: this.tutor.apellido,
          tipo: 'tutor',
          parentesco: 'tutor',
        };
      } else {
        // Para familiares, primero intentar obtener datos completos del backend
        autorizado = await this.obtenerDatosFamiliar(persona, hijo.id);
      }

      const ahora = new Date();
      const fechaExpiracion = new Date(ahora.getTime() + 12 * 60 * 60 * 1000);

      // Construir datos del QR
      const datosQR: DatosQR = {
        estudiante: {
          id: hijo.id,
          nombre: hijo.nombre,
          grado: hijo.grupo.nombre
        },
        autorizadoRecoger: autorizado,
        fechaGeneracion: ahora.toISOString(),
        fechaExpiracion: fechaExpiracion.toISOString(),
        codigoUnico: this.generarCodigoUnico()
      };

      // Generar imagen QR
      const qrDataUrl = await this.generarImagenQR(datosQR);

      // Actualizar datos del hijo
      this.actualizarDatosHijo(hijo, datosQR, qrDataUrl);

      // Mostrar éxito
      this.mostrarToast(`QR generado para ${autorizado.nombre} ${autorizado.apellido}`, 'success');

    } catch (error) {
      console.error('Error generando QR:', error);
      this.mostrarToast('Error al generar el QR. Inténtalo nuevamente.', 'danger');
    } finally {
      hijo.generandoQR = false;
      this.cdr.detectChanges();
    }
  }

  private async obtenerDatosFamiliar(persona: any, hijoId: number): Promise<AutorizadoRecoger> {
    try {
      if (!this.tutor) throw new Error('No hay tutor disponible');

      // El backend necesita tutorId y alumnoId para obtener los conocidos autorizados
      const datosQRBackend = await this._qrService
        .obtenerDatosQR(this.tutor.id, hijoId)
        .toPromise();

      // Buscar el familiar específico en la respuesta del backend
      const familiarBackend = datosQRBackend?.find((k: any) => k.idConocido === persona.id);

      if (familiarBackend) {
        return {
          nombre: familiarBackend.nombreConocido,
          apellido: familiarBackend.apellidoConocido,
          tipo: 'familiar',
          parentesco: familiarBackend.parentesco,
          id: familiarBackend.idConocido
        };
      }
    } catch (error) {
      console.warn('No se pudieron obtener datos del backend, usando datos locales:', error);
    }

    // Fallback: usar datos locales
    return {
      nombre: persona.nombre,
      apellido: persona.apellido,
      tipo: 'familiar',
      parentesco: persona.parentesco,
      id: persona.id
    };
  }

  private generarCodigoUnico(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 8);
    return `${timestamp}${random}`.toUpperCase();
  }

  private async generarImagenQR(datosQR: DatosQR): Promise<string> {
    const qrData = JSON.stringify(datosQR);

    return QRCode.toDataURL(qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    });
  }

  private actualizarDatosHijo(hijo: Hijo, datosQR: DatosQR, qrDataUrl: string) {
    hijo.codigo = datosQR.codigoUnico;
    hijo.qrGenerated = true;
    hijo.qrDataUrl = qrDataUrl;
    hijo.datosQR = datosQR;
    this.cdr.detectChanges();
  }

  async descargarQR(index: number) {
    if (!this.tutor || !this.tutor.hijos[index]) {
      this.mostrarToast('Error: No se encontró el QR', 'danger');
      return;
    }

    const hijo = this.tutor.hijos[index];

    if (!hijo.qrDataUrl) {
      this.mostrarToast('No hay código QR generado para descargar', 'warning');
      return;
    }

    try {
      const link = document.createElement('a');
      link.download = `QR-${hijo.nombre}-${hijo.codigo || 'sin-codigo'}.png`;
      link.href = hijo.qrDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.mostrarToast('QR descargado exitosamente', 'success');
    } catch (error) {
      console.error('Error al descargar QR:', error);
      this.mostrarToast('Error al descargar el QR', 'danger');
    }
  }

  async compartirQR(index: number) {
    if (!this.tutor || !this.tutor.hijos[index]) {
      this.mostrarToast('Error: No se encontró el QR', 'danger');
      return;
    }

    const hijo = this.tutor.hijos[index];

    if (!hijo.qrDataUrl) {
      this.mostrarToast('No hay código QR generado para compartir', 'warning');
      return;
    }

    try {
      if (navigator.share) {
        const response = await fetch(hijo.qrDataUrl);
        const blob = await response.blob();
        const file = new File([blob], `QR-${hijo.nombre}.png`, { type: 'image/png' });

        await navigator.share({
          title: `QR de acceso para ${hijo.nombre}`,
          text: `Código: ${hijo.codigo}`,
          files: [file]
        });

        this.mostrarToast('QR compartido exitosamente', 'success');
      } else {
        // Fallback: copiar al portapapeles
        await navigator.clipboard.writeText(hijo.qrDataUrl);
        this.mostrarToast('Imagen copiada al portapapeles', 'success');
      }
    } catch (error) {
      console.error('Error al compartir QR:', error);
      this.mostrarToast('Error al compartir. Usa la opción de descarga.', 'warning');
    }
  }

  // Métodos auxiliares
  private async mostrarToast(mensaje: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'bottom',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  private async mostrarErrorYRedireccionar(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error de Autenticación',
      message: mensaje,
      buttons: [
        {
          text: 'Ir al Login',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  private verificarExpiracionQR() {
    if (!this.tutor) return;

    const ahora = new Date();

    this.tutor.hijos.forEach(hijo => {
      if (hijo.datosQR?.fechaExpiracion) {
        const expira = new Date(hijo.datosQR.fechaExpiracion);
        if (ahora > expira) {
          hijo.qrGenerated = false;
          hijo.qrDataUrl = '';
          hijo.codigo = '';
          hijo.datosQR = null;
        }
      }
    });
  }

  getBadgeColor(hijo: Hijo): string {
    if (!hijo.qrGenerated) return 'medium';
    if (!hijo.datosQR?.fechaExpiracion) return 'medium';

    const expira = new Date(hijo.datosQR.fechaExpiracion);
    return new Date() > expira ? 'danger' : 'success';
  }

  getBadgeText(hijo: Hijo): string {
    if (!hijo.qrGenerated) return 'Sin código';
    if (!hijo.datosQR?.fechaExpiracion) return 'Activo';

    const expira = new Date(hijo.datosQR.fechaExpiracion);
    return new Date() > expira ? 'Expirado' : 'Activo';
  }

  // Método para refrescar datos manualmente
  async refrescarDatos(event?: any) {
    try {
      const usuario = this.obtenerUsuarioLocalStorage();
      if (usuario?.id) {
        this.cargarDatosTutor(usuario.id);
      }
    } catch (error) {
      console.error('Error al refrescar datos:', error);
      this.mostrarToast('Error al refrescar datos', 'danger');
    } finally {
      if (event) {
        event.target.complete();
      }
    }
  }
}