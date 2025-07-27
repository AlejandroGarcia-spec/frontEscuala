import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { TutoresService } from 'src/app/core/services/tutores.service';

interface Grupo {
  id: number;
  nombre: string;
}

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  correo?: string;
  telefono?: string;
  grupoId: number;
  imagenBase64?: string; // o URL si así lo manejas
}

@Component({
  selector: 'app-editar-alumno-modal',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-alumno-modal.page.html',
  styleUrls: ['./editar-alumno-modal.page.scss'],
})
export class EditarAlumnoModalPage implements OnInit {
 tutores: any[] = [];
  @Input() alumno!: Alumno; // Recibir el alumno a editar como input
  alumnoForm!: FormGroup;
  grupos: Grupo[] = [];
  alumnos: Alumno[] = []; // Lista de alumnos para el select

  fotoPreview: string | ArrayBuffer | null = null;
  fotoArchivo: File | null = null;

  constructor(
  private fb: FormBuilder,
  private toastController: ToastController,
  private modalController: ModalController,
  private grupoService: GrupoService,
  private alumnosService: AlumnosService,
  private tutorService: TutoresService // Asegúrate de importar el servicio de tutores
) {}


 ngOnInit() {
  // Inicializa el formulario sin datos aún
  this.alumnoForm = this.fb.group({
    id: [null, Validators.required],  // Para seleccionar alumno
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.email]],
    telefono: ['', [Validators.pattern(/^\d{10}$/)]],
    grupoId: ['', Validators.required],
    tutorId: ['', Validators.required] // <-- nuevo campo
  });
  this.cargarTutores(); // <-- aquí llamamos
  this.cargarGrupos();
  this.cargarAlumnos();
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
      this.grupos = res;
    },
    error: async (err) => {
      const toast = await this.toastController.create({
        message: 'Error al cargar grupos',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  });
}

cargarAlumnos() {
  this.alumnosService.obtenerAlumnos().subscribe({
    next: (res: any) => {
      this.alumnos = res;
    },
    error: async (err) => {
      const toast = await this.toastController.create({
        message: 'Error al cargar alumnos',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
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

 async guardarAlumno() {
  if (this.alumnoForm.valid) {
    const datos = this.alumnoForm.value;
    const alumnoActualizado = {
  nombre: datos.nombre,
  apellido: datos.apellido,
  correo: datos.correo,
  telefono: datos.telefono,
  grupoId: datos.grupoId,
  tutorId: datos.tutorId,  // convertir a número explícitamente
  imagenBase64: this.fotoPreview ? this.fotoPreview.toString() : null
};
    this.alumnosService.actualizarAlumno(datos.id, alumnoActualizado).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Alumno actualizado correctamente ✅',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.cerrarModal(true);
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Error al actualizar alumno',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    });
  } else {
    const toast = await this.toastController.create({
      message: 'Formulario inválido ❌',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}


  cerrarModal(actualizo: boolean = false) {
    this.modalController.dismiss({ actualizado: actualizo });
  }
onAlumnoChange(event: any) {
  const idAlumno = event.detail.value;
  this.alumnosService.obtenerAlumnoPorId(idAlumno).subscribe({
    next: (alumno: Alumno) => {
      this.alumnoForm.patchValue({
        id: alumno.id,
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        correo: alumno.correo || '',
        telefono: alumno.telefono || '',
        grupoId: alumno.grupoId,
      });
      this.fotoPreview = alumno.imagenBase64 || null;
    },
    error: async () => {
      const toast = await this.toastController.create({
        message: 'Error al cargar datos del alumno',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  });
}

}
