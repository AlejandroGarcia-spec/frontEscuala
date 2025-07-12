import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AgregarTutorModalPage } from 'src/app/modal/agregar-tutor-modal/agregar-tutor-modal.page';
import { EditarTutorModalPage } from 'src/app/modal/editar-tutor-modal/editar-tutor-modal.page';
import { EliminarTutorModalPage } from 'src/app/modal/eliminar-tutor-modal/eliminar-tutor-modal.page';
import { FooterPage } from "src/app/componentes/footer/footer.page";


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
  diasArray: string[] = [];
  selectedFile: File | null = null;
  instructores: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly modalController: ModalController,
  ) {
    this.formTutoria = this.fb.group({
      instructor: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      tipo: ['', Validators.required],
      cantidadDias: ['', [Validators.required, Validators.max(5)]],
      cupos: ['', Validators.required],
      imagen: [null, Validators.required]
    });

    this.formTutoria.get('cantidadDias')?.valueChanges.subscribe((cantidad) => {
      this.agregarCamposDiasHoras(cantidad);
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


  agregarCamposDiasHoras(cantidad: number) {
    const controls = Object.keys(this.formTutoria.controls);
    controls.forEach(controlName => {
      if (controlName.startsWith('dia_') || controlName.startsWith('hora_')) {
        this.formTutoria.removeControl(controlName);
      }
    });

    if (cantidad > 0 && cantidad <= 5) {
      for (let i = 1; i <= cantidad; i++) {
        this.formTutoria.addControl('dia_' + i, this.fb.control('lunes', Validators.required));
        this.formTutoria.addControl('hora_' + i, this.fb.control('07:00', Validators.required));
      }
      this.diasArray = Array.from({ length: cantidad }, (_, i) => (i + 1).toString());
    }
  }

  convertToUpperCase(event: any, controlName: string) {
    const value = event.target.value.toUpperCase();
    this.formTutoria.get(controlName)?.setValue(value);
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
    });
  }

  async abrirModalEditarInstructor() {
    const modal = await this.modalController.create({
      component: EditarTutorModalPage,
      componentProps: {
        instructores: this.instructores
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
    });
  }

  async abrirModalEliminarInstructor() {
    const modal = await this.modalController.create({
      component: EliminarTutorModalPage,
      componentProps: {
        instructores: this.instructores
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
    });
  }
   cerrarModal() {
    this.modalController.dismiss();
  }
}
