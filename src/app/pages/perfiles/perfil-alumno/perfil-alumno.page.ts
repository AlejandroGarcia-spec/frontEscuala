import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ConocidosService } from 'src/app/core/services/conocidos.service';
import { FormularioModalComponent } from 'src/app/modal/formulario-modal/formulario-modal.component';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage {
  familiares: any[] = [];
  tutorId!: number;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private conocidosService: ConocidosService,
  ) {}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    if (!usuario || !usuario.id) {
      console.error('No se encontró el ID del tutor en localStorage');
      return;
    }

    this.tutorId = usuario.id;
    this.cargarFamiliares();
  }

  cargarFamiliares() {
    this.conocidosService.getByTutorId(this.tutorId).subscribe({
      next: (data) => (this.familiares = data),
      error: () => this.mostrarToast('No se pudieron cargar los familiares', 'danger'),
    });
  }

  async abrirRegistroFamiliar(familiar?: any) {
    const modal = await this.modalCtrl.create({
      component: FormularioModalComponent,
      componentProps: {
        familiar: familiar ? { ...familiar } : null,
      },
    });

    modal.onDidDismiss().then(async ({ data }) => {
      if (data?.familiar) {
        const fam = data.familiar;

        if (!fam.fotoArchivo && !fam.foto) {
          this.mostrarToast('La foto es obligatoria', 'warning');
          return;
        }

        const fotoBase64 = fam.foto
          ? fam.foto // ya base64 (en edición)
          : await this.convertirImagenABase64(fam.fotoArchivo);

        const conocidoPayload = {
          nombre: fam.nombre,
          apellido: fam.apellido,
          parentesco: fam.parentesco,
          tutorId: this.tutorId,
          foto: fotoBase64,
        };

        if (familiar) {
          // Editar
          this.conocidosService.update(familiar.id, conocidoPayload).subscribe({
            next: () => {
              this.mostrarToast('Familiar actualizado', 'success');
              this.cargarFamiliares();
            },
            error: () => this.mostrarToast('Error al actualizar familiar', 'danger'),
          });
        } else {
          // Crear
          this.conocidosService.create(conocidoPayload).subscribe({
            next: () => {
              this.mostrarToast('Familiar registrado exitosamente', 'success');
              this.cargarFamiliares();
            },
            error: () => this.mostrarToast('Error al registrar familiar', 'danger'),
          });
        }
      }
    });

    await modal.present();
  }

  async eliminarFamiliar(id: number, nombre: string, apellido: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Familiar',
      message: `¿Estás seguro de que quieres eliminar a ${nombre} ${apellido}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.conocidosService.delete(id).subscribe({
              next: () => {
                this.mostrarToast('Familiar eliminado', 'success');
                this.cargarFamiliares();
              },
              error: () => this.mostrarToast('Error al eliminar familiar', 'danger'),
            });
          },
        },
      ],
    });

    await alert.present();
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  private convertirImagenABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
