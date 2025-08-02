import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-grupo-modal',
  imports: [IonicModule, FormsModule,ReactiveFormsModule,CommonModule],
  standalone: true,
  templateUrl: './eliminar-grupo-modal.page.html',
  styleUrls: ['./eliminar-grupo-modal.page.scss'],
})
export class EliminarGrupoModalPage  {
  eliminarForm!: FormGroup;
  carreras: any[] = [];
  grupos: any[] = [];
  grupoCarreraId: number = 0;
  grupoId!: number;
 
constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
     private http: HttpClient
  ) {
  this.eliminarForm = this.formBuilder.group({
    grupoCarreraId: ['', Validators.required]
  });

  this.loadGrupos();
  }
loadGrupos() {
  this.http.get<any[]>('http://localhost:3000/grupos/getAll').subscribe({
    next: (data) => {
      this.grupos = data;
      if (this.grupoCarreraId) {
        this.eliminarForm.patchValue({ grupoCarreraId: this.grupoCarreraId });
      }
    },
    error: () => this.mostrarToastError('Error al cargar los grupos')
  });
}

  onGrupoChange(event: any) {
    const grupo = this.grupos.find(g => g.id === event.detail.value);
    if (grupo) {
      this.eliminarForm.patchValue({ grupoCarreraId: grupo.id });
    }
  }
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este grupo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarGrupo(this.eliminarForm.get('grupoCarreraId')?.value);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarGrupo(id: number) {
  this.http.delete(`http://localhost:3000/grupos/delete/${id}`).subscribe({
    next: () => {
      this.mostrarToastSuccess('Grupo eliminado con éxito');
      this.loadGrupos();
    },
    error: (error) => {
      if (error.status === 400 && error.error?.message) {
        this.mostrarToastError(error.error.message);
      } else {
        this.mostrarToastError('Error al eliminar el grupo');
      }
    }
  });
}

  cerrarModal() {
    this.modalController.dismiss();
  }
  async mostrarToastSuccess(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
    position: 'top',
    color: 'success'
  });
  toast.present();
}

async mostrarToastError(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
    position: 'top',
    color: 'danger'
  });
  toast.present();
}
}
