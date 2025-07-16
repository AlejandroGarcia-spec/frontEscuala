import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AgregarMaestroModalPage } from 'src/app/modal/agregar-maestro-modal/agregar-maestro-modal.page';
import { EditarMaestroModalPage } from 'src/app/modal/editar-maestro-modal/editar-maestro-modal.page';
import { EliminarMaestroModalPage } from 'src/app/modal/eliminar-maestro-modal/eliminar-maestro-modal.page';
import { FooterPage } from "src/app/componentes/footer/footer.page";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule, FooterPage],
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
 formTutoria!: FormGroup;
  isEdit: boolean = false;
  id!: number;
  diasArray: string[] = [];
  selectedFile: File | null = null;
  instructores: any[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private modalController: ModalController,
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




  }

  ngOnInit() {
    this.obtenerInstructores();
  }

  obtenerInstructores() {

  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }


  async abrirModalAgregarMaestro() {
    const modal = await this.modalController.create({
      component: AgregarMaestroModalPage,
      componentProps: {
        instructores: this.instructores
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.obtenerInstructores();
    });
  }

  async abrirModalEditarMaestro() {
    const modal = await this.modalController.create({
      component: EditarMaestroModalPage,
      componentProps: {
        instructores: this.instructores
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.obtenerInstructores();
    });
  }

  async abrirModalEliminarMaestro() {
    const modal = await this.modalController.create({
      component: EliminarMaestroModalPage,
      componentProps: {
        instructores: this.instructores
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.obtenerInstructores();
    });
  }
}
