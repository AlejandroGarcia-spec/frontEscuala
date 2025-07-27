import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { TutoresService } from 'src/app/core/services/tutores.service';

@Component({
  selector: 'app-agregar-alumno-modal',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-alumno-modal.page.html',
  styleUrls: ['./agregar-alumno-modal.page.scss'],
})
export class AgregarAlumnoModalPage implements OnInit {
  alumnoForm!: FormGroup;
  grupos: any[] = [];
  fotoPreview: string | ArrayBuffer | null = null;
  fotoArchivo: File | null = null;
  tutores: any[] = [];
  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private modalController: ModalController,
    private grupoService: GrupoService,
    private alumnosService: AlumnosService, // Asegúrate de importar el servicio de alumnos,
      private tutorService: TutoresService // <-- aquí
  ) {}

  ngOnInit() {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.email]],
      telefono: ['', [Validators.pattern(/^\d{10}$/)]],
      grupoId: ['', Validators.required],  // <-- grupoId es string aquí porque el input es texto o select
      tutorId: ['', Validators.required] // <-- nuevo campo

    });
    this.cargarTutores(); // <-- aquí llamamos
    this.cargarGrupos();
  }
cargarTutores() {
  this.tutorService.obtenerTutores().subscribe({
    next: (res: any) => {
      this.tutores = res;
    },
    error: async (err) => {
      const toast = await this.toastController.create({
        message: 'Error al cargar tutores',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      console.error(err);
    }
  });
}
  cargarGrupos() {
    this.grupoService.obtenerGrupos().subscribe({
      next: (res: any) => {
        this.grupos = res; // Asume que el backend devuelve un array de grupos
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Error al cargar grupos',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
        console.error(err);
      },
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

    // Convierte grupoId a string para poder usar trim, o sólo verifica que exista y no sea vacío
    const grupoIdStr = datos.grupoId ? datos.grupoId.toString() : '';

    if (grupoIdStr === '') {
      console.error('El grupoId no puede estar vacío');
      return;
    }

    const alumnoConFoto = {
      ...datos,
  grupoId: Number(datos.grupoId),  // convertir a número explícitamente
  imagenBase64: this.fotoPreview ? this.fotoPreview.toString() : null
    };

    this.alumnosService.crearAlumno(alumnoConFoto).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Alumno guardado correctamente ✅',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.cerrarModal();
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Error al guardar alumno ❌',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
        console.error(err);
      }
    });
  } else {
    console.log('Formulario inválido ❌');
  }
}


  cerrarModal() {
    this.modalController.dismiss();
  }
}
