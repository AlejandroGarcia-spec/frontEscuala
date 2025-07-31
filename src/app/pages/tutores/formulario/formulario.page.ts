import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AgregarTutorModalPage } from 'src/app/modal/agregar-tutor-modal/agregar-tutor-modal.page';
import { EditarTutorModalPage } from 'src/app/modal/editar-tutor-modal/editar-tutor-modal.page';
import { EliminarTutorModalPage } from 'src/app/modal/eliminar-tutor-modal/eliminar-tutor-modal.page';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { TutoresService } from 'src/app/core/services/tutores.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FooterPage]
})
export class FormularioPage{

  formTutoria!: FormGroup;
  isEdit: boolean = false;
  id!: number;
  selectedFile: File | null = null;
  instructores: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly tutoresService: TutoresService,
  ) {
this.cargarTutores();
  }
    cargarTutores() {
    this.tutoresService.obtenerTutores().subscribe({
      next: (respuesta: any) => {
        this.instructores = respuesta;
      },
      error: (err) => {
        console.error('Error al obtener tutores:', err);
        this.mostrarToast('Error al cargar tutores', 'danger');
      }
    });
  }
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  async abrirModalAgregarInstructor() {
    const modal = await this.modalController.create({
      component: AgregarTutorModalPage,
      componentProps: {
        instructores: this.instructores
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
        this.cargarTutores();
    });
  }

  async abrirModalEditarInstructor(tutor: any) {
  const modal = await this.modalController.create({
    component: EditarTutorModalPage,
    componentProps: {
      tutorSeleccionado: tutor
    }
  });
    await modal.present();
    modal.onDidDismiss().then(() => {
        this.cargarTutores();
    });
  }

  async abrirModalEliminarInstructor(tutor: any) {
    const modal = await this.modalController.create({
      component: EliminarTutorModalPage,
      componentProps: {
        tutorId: tutor.id
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
        this.cargarTutores();
    });
  }
   cerrarModal() {
    this.modalController.dismiss();
  }
  obtenerNombresHijos(tutor: any): string {
  if (!tutor.alumno || tutor.alumno.length === 0) {
    return 'Sin hijos';
  }
  return tutor.alumno.map((a: any) => a.nombre).join(', ');
}

}
