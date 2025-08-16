import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AutorizadoService } from 'src/app/core/services/autorizado.service';
import { SalidasService, Salida } from 'src/app/core/services/salidas.service';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { GrupoService } from 'src/app/core/services/grupo.service';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule, ZXingScannerModule],
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQrPage implements OnInit {
  alumno: any = null;
  autorizado: any = null;
  salidaAutorizada = false;
  qrResult = '';

  // Propiedades para la lista
  mostrarScanner = false;
  salidas: Salida[] = [];
  salidasFiltradas: Salida[] = [];
  grupos: any[] = [];
  fechas: string[] = [];

  // Filtros
  filtroGrupo = '';
  filtroFecha = '';

  constructor(
    private autorizadoService: AutorizadoService,
    private salidasService: SalidasService,
    private alumnosService: AlumnosService,
    private gruposService: GrupoService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.cargarSalidas();
    this.cargarGrupos();
  }

  cargarSalidas() {
    this.salidasService.obtenerSalidas().subscribe({
      next: (salidas) => {
        console.log('Salidas cargadas:', salidas);
        this.salidas = salidas || [];
        this.salidasFiltradas = this.salidas;
        this.extraerFechasUnicas();
      },
      error: (err) => {
        console.error('Error al cargar salidas:', err);
        this.salidas = [];
        this.salidasFiltradas = [];
      }
    });
  }

  cargarGrupos() {
    // Usar endpoint específico de grupos
    this.gruposService.obtenerGrupos().subscribe({
      next: (grupos) => {
        console.log('Grupos cargados:', grupos);
        this.grupos = grupos || [];
      },
      error: (err) => {
        console.error('Error al cargar grupos:', err);
        // Fallback: extraer grupos de alumnos si falla el endpoint
        this.alumnosService.obtenerAlumnos().subscribe({
          next: (alumnos) => {
            const gruposUnicos = [...new Set(alumnos
              .map((a: any) => a.grupo?.nombre || a.grado)
              .filter(Boolean))];
            this.grupos = gruposUnicos.map(nombre => ({ nombre }));
          },
          error: (err2) => {
            console.error('Error al cargar alumnos:', err2);
            this.grupos = [];
          }
        });
      }
    });
  }

  extraerFechasUnicas() {
    if (!this.salidas || this.salidas.length === 0) {
      this.fechas = [];
      return;
    }

    const fechasUnicas = [...new Set(this.salidas.map(salida =>
      this.formatearFecha(salida.Date)
    ))];
    this.fechas = fechasUnicas.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }

  aplicarFiltros() {
    if (!this.salidas) return;

    this.salidasFiltradas = this.salidas.filter(salida => {
      const cumpleFecha = !this.filtroFecha ||
        this.formatearFecha(salida.Date) === this.filtroFecha;

      const grupoAlumno = salida.alumno?.grupo?.nombre || salida.alumno?.grado || '';
      const cumpleGrupo = !this.filtroGrupo || grupoAlumno === this.filtroGrupo;

      return cumpleFecha && cumpleGrupo;
    });

    console.log(`Filtros aplicados - Grupo: "${this.filtroGrupo}", Fecha: "${this.filtroFecha}"`);
    console.log(`Salidas filtradas: ${this.salidasFiltradas.length} de ${this.salidas.length}`);
  }

  onFiltroGrupoChange() {
    this.aplicarFiltros();
  }

  onFiltroFechaChange() {
    this.aplicarFiltros();
  }

  mostrarEscanner() {
    this.mostrarScanner = true;
  }

  ocultarEscanner() {
    this.mostrarScanner = false;
    this.reset();
  }

  onCodeResult(result: string) {
    this.qrResult = result;
    try {
      const datosQR = JSON.parse(result);
      console.log(datosQR);

      // Datos alumno
      this.alumno = {
        id: datosQR.estudiante.id,
        nombre: datosQR.estudiante.nombre,
        grado: datosQR.estudiante.grado
      };

      // Datos autorizado (nombre, apellido, parentesco)
      this.autorizado = {
        ...datosQR.autorizadoRecoger,
        foto: null
      };

      // Obtener foto desde BD
      if (this.autorizado.id) {
        this.autorizadoService
          .getFotoAutorizado(this.autorizado.tipo, this.autorizado.id)
          .subscribe((res) => {
            this.autorizado.foto = res.foto || 'https://backescolar-production.up.railway.app/tutore';
          });
      }
    } catch (error) {
      console.error('Error al parsear QR:', error);
      alert('QR inválido');
    }
  }

  async confirmarSalida() {
    const createSalidaDto = {
      nombre_Recoge: `${this.autorizado.nombre} ${this.autorizado.apellido}`,
      alumnoId: Number(this.alumno.id)
    };

    this.salidasService.crearSalida(createSalidaDto).subscribe({
      next: async () => {
        await this.mostrarToast('✅ Salida registrada exitosamente', 'success');
        this.reset();
        this.mostrarScanner = false;
        this.cargarSalidas();
      },
      error: async (err) => {
        console.error('Error al registrar salida:', err);
        await this.mostrarToast('❌ Error al registrar la salida', 'danger');
      }
    });
  }

  async eliminarSalida(salidaId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Está seguro de eliminar esta salida?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.salidasService.eliminarSalida(salidaId).subscribe({
              next: async () => {
                await this.mostrarToast('Salida eliminada correctamente', 'warning');
                this.cargarSalidas();
              },
              error: async (err) => {
                console.error('Error al eliminar salida:', err);
                await this.mostrarToast('❌ Error al eliminar la salida', 'danger');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  formatearHora(fecha: string): string {
    if (!fecha) return '';
    return new Date(fecha).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-MX');
  }

  obtenerNombreGrupo(salida: Salida): string {
    return salida.alumno?.grupo?.nombre || salida.alumno?.grado || 'Sin grupo';
  }

  obtenerNombreAlumno(salida: Salida): string {

    if (!salida.alumno) return 'Sin datos';
    const nombre = salida.alumno.nombre || '';
    const apellido = salida.alumno.apellido || '';
    return `${nombre} ${apellido}`.trim();
  }

  reset() {
    this.alumno = null;
    this.autorizado = null;
    this.qrResult = '';
    this.salidaAutorizada = false;
  }


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
}
