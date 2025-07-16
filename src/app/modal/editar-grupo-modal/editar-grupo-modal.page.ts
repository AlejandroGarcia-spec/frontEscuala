import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-grupo-modal',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './editar-grupo-modal.page.html',
  styleUrls: ['./editar-grupo-modal.page.scss'],
})
export class EditarGrupoModalPage  {

 nombre: string = '';
  id: number = 0;
  carreraId: number = 0;
  grupoCarreraId: number = 0; // Nueva propiedad para almacenar el ID del grupo seleccionado
  carreras: any[] = [];
  grupos: any[] = [];
  selectedGrupoId: string='';
  selectedCarreraId: string = '';
  constructor(private modalController: ModalController, private toastController: ToastController) {

      this.id = 0;
      this.carreraId = 0;
      this.grupoCarreraId = 0;
  }

  onCarreraChange(event: any) {
}

modificarGrupo() {

  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
