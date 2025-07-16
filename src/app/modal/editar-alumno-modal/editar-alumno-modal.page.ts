import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
interface Grupo {
  id: number;
  nombre: string;
}

interface Alumno {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-editar-alumno-modal',
  standalone: true,
  imports:  [IonicModule,ReactiveFormsModule, CommonModule],
  templateUrl: './editar-alumno-modal.page.html',
  styleUrls: ['./editar-alumno-modal.page.scss'],
})

export class EditarAlumnoModalPage  {
  grupos: Grupo[] = [];
  alumnos: Alumno[] = [];
  formInstructor!: FormGroup;
  instructores: any[] = [];
  selectedInstructor: any = null;
  showPassword: boolean = false;
 alumnoForm!: FormGroup;
  grupos1 = [
    { id: 1, nombre: 'Grupo A' },
    { id: 2, nombre: 'Grupo B' },
    // Se puede obtener dinámicamente del backend más adelante
  ];
  fotoPreview: string | ArrayBuffer | null = null;
  fotoArchivo: File | null = null;

  constructor(private fb: FormBuilder,
        private toastController: ToastController,
        private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.email]], // Opcional
      telefono: ['', [Validators.pattern(/^\d{10}$/)]], // Opcional, solo 10 dígitos
      grupoId: ['', Validators.required]
    });
  }

  onImageSelected(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.fotoArchivo = archivo;

      const lector = new FileReader();
      lector.onload = () => {
        this.fotoPreview = lector.result;
      };
      lector.readAsDataURL(archivo);
    }
  }

  guardarAlumno() {
    if (this.alumnoForm.valid) {
      const datos = this.alumnoForm.value;
      console.log('Datos del alumno:', datos);
      console.log('Archivo de imagen:', this.fotoArchivo);
      // Enviar a backend cuando esté disponible
    } else {
      console.log('Formulario inválido ❌');
    }
  }
   cerrarModal() {
    this.modalController.dismiss();
  }
  obtenerInstructores() {
  }

  onInstructorChange(event: any) {
  }
  async modificarInstructor() {

  }
}
