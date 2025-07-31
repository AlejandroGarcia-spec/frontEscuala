import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { AgregarAlumnoModalPage } from 'src/app/modal/agregar-alumno-modal/agregar-alumno-modal.page';
import { EditarAlumnoModalPage } from 'src/app/modal/editar-alumno-modal/editar-alumno-modal.page';
import { EliminarAlumnoModalPage } from 'src/app/modal/eliminar-alumno-modal/eliminar-alumno-modal.page';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { GrupoService } from 'src/app/core/services/grupo.service';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule, FooterPage]
})
export class FormularioPage  {
  formTutoria!: FormGroup;
  isEdit: boolean = false;
  id!: number;
  selectedFile: File | null = null;
  grupos: any[] = [];
alumnos: any[] = [];
alumnosFiltrados: any[] = [];
grupoSeleccionado: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastController: ToastController,
    private readonly modalController: ModalController,
    private readonly grupoService: GrupoService,
    private readonly alumnoService: AlumnosService
  ) {
     this.obtenerGrupos();
  this.obtenerAlumnos();
  }
  obtenerGrupos() {
  this.grupoService.obtenerGrupos().subscribe((res) => {
    this.grupos = res as any[];
  });
}
obtenerAlumnos() {
  this.alumnoService.obtenerAlumnos().subscribe({
    next: (data) => {
      this.alumnos = data;
      this.filtrarAlumnosPorGrupo(); // ✅ Se actualiza después de cargar
    },
    error: (error) => {
      console.error('Error al obtener alumnos:', error);
    }
  });
}

filtrarAlumnosPorGrupo() {
  if (this.grupoSeleccionado) {
    this.alumnosFiltrados = this.alumnos.filter(alumno => {
      if (!alumno.grupo) return false;
      if (typeof alumno.grupo === 'number') return alumno.grupo === this.grupoSeleccionado;
      if (typeof alumno.grupo === 'object') return alumno.grupo.id === this.grupoSeleccionado;
      return false;
    });
  } else {
    this.alumnosFiltrados = [];
  }
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


  convertToUpperCase(event: any, controlName: string) {
    const value = event.target.value.toUpperCase();
    this.formTutoria.get(controlName)?.setValue(value);
  }
  async abrirModalAgregarAlumno() {
    const modal = await this.modalController.create({
      component: AgregarAlumnoModalPage,
      componentProps: {
        alumnos: this.alumnos
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
  this.obtenerAlumnos();
});

  }

  async abrirModalEditarAlumno(alumno: any) {
    const modal = await this.modalController.create({
      component: EditarAlumnoModalPage,
      componentProps: {
        alumnoSeleccionado: alumno
      }
    });
    await modal.present();
  modal.onDidDismiss().then(() => {
  this.obtenerAlumnos();
});

  }

  async abrirModalEliminarAlumno(alumno: any) {
    const modal = await this.modalController.create({
      component: EliminarAlumnoModalPage,
      componentProps: {
        alumnoId: alumno.id
      }
    });
    await modal.present();
   modal.onDidDismiss().then(() => {
  this.obtenerAlumnos();
});

  }
   cerrarModal() {
    this.modalController.dismiss();
  }
}
