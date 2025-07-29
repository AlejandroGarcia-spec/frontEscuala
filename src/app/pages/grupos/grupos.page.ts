import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AgregarGrupoModalPage } from 'src/app/modal/agregar-grupo-modal/agregar-grupo-modal.page';
import { EditarGrupoModalPage } from 'src/app/modal/editar-grupo-modal/editar-grupo-modal.page';
import { EliminarGrupoModalPage } from 'src/app/modal/eliminar-grupo-modal/eliminar-grupo-modal.page';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { GrupoService } from 'src/app/core/services/grupo.service';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FooterPage, FormsModule],
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage  {

 carreras: any[] = [];
  grupos: any[] = [];
  selectedCarreraId: string = '';

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private grupoService: GrupoService  ) {
    this.actualizarGrupos(); // cargar grupos al iniciar
  }

  actualizarGrupos() {
    this.grupoService.obtenerGrupos().subscribe(
      (data) => {
        this.grupos = data as any[];
      },
      (error) => {
        console.error('Error al obtener grupos:', error);
        this.grupos = [];
      }
    );
  }

  async abrirModalAgregarGrupo() {
    const modal = await this.modalController.create({
      component: AgregarGrupoModalPage,
      componentProps: {
        carreras: this.carreras
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.actualizarGrupos();
    });
  }

  async abrirModalEditarGrupo() {
    const modal = await this.modalController.create({
      component: EditarGrupoModalPage,
      componentProps: {
        carreras: this.carreras
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.actualizarGrupos();
    });
  }

  async abrirModalEliminarGrupo() {
    const modal = await this.modalController.create({
      component: EliminarGrupoModalPage,
      componentProps: {
        carreras: this.carreras
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.actualizarGrupos();
    });
  }


}

