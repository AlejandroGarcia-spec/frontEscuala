import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-grupo-modal',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './editar-grupo-modal.page.html',
  styleUrls: ['./editar-grupo-modal.page.scss'],
})
export class EditarGrupoModalPage  {
grupoSeleccionado: any;
 nombre: string = '';
  grupoCarreraId: number = 0;
  grupos: any[] = [];
  selectedGrupoId: string='';
  constructor(private modalController: ModalController,
    private toastController: ToastController,
    private http: HttpClient,
    private readonly navParams: NavParams
  ) {
      this.grupoSeleccionado = this.navParams.get('grupoSeleccionado');
      this.nombre = this.grupoSeleccionado.nombre;
      this.grupoCarreraId = this.grupoSeleccionado.carreraId;
      this.loadGrupos();
  }
  loadGrupos() {
  this.http.get<any[]>('http://localhost:3000/grupos/getAll').subscribe({
    next: (data) => this.grupos = data,
    error: () => this.mostrarToastError('Error al cargar los grupos')
  });
}

modificarGrupo() {
  const grupoActualizado = {
    nombre: this.nombre
  };

  this.http.patch(`http://localhost:3000/grupos/update/${this.grupoCarreraId}`, grupoActualizado)
    .subscribe({
      next: () => {
        this.mostrarToastSuccess('Grupo modificado correctamente');
        this.cerrarModal();
      },
      error: () => this.mostrarToastError('Error al modificar el grupo')
    });
}

  onGrupoChange(event: any) {
  const grupo = this.grupos.find(g => g.id === this.grupoCarreraId);
  if (grupo) {
    this.nombre = grupo.nombre;
  }
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
