import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { MaestrosService } from 'src/app/core/services/maestros.service';
interface Grupo {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-editar-maestro-modal',
  standalone: true,
  imports: [IonicModule,ReactiveFormsModule,CommonModule],
  templateUrl: './editar-maestro-modal.page.html',
  styleUrls: ['./editar-maestro-modal.page.scss'],
})
export class EditarMaestroModalPage  {
  formInstructor!: FormGroup;
  instructores: any[] = [];
  selectedInstructor: any = null;
  showPassword: boolean = false;
fotoPreview: string | ArrayBuffer | null = null;
  fotoArchivo: File | null = null;
      grupos: Grupo[] = [];
  constructor(
    private fb: FormBuilder,
    private _Service: AuthService,
    private toastController: ToastController,
    private modalController: ModalController,
    private grupoService: GrupoService,
    private maestrosService: MaestrosService
  ) {
    this.formInstructor = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required,Validators.maxLength(30)]],
      apellido: ['', [Validators.required,Validators.maxLength(30)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10)]],
      grupoId: ['', Validators.required],  // <-- grupoId es string aquí porque el input es texto o se
 });
      this.cargarGrupos();
      this.cargarMaestros(); // 👈 importante
  }

async agregarInstructor() {
  if (!this.selectedInstructor) return;

  const formValue = this.formInstructor.value;

  const maestroActualizado = {
    ...formValue,
    imagenBase64: this.fotoPreview,
  };

  this.maestrosService.actualizarMaestro(this.selectedInstructor.id, maestroActualizado).subscribe({
    next: async () => {
      const toast = await this.toastController.create({
        message: 'Docente actualizado correctamente',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.cerrarModal();
    },
    error: async (err) => {
      const toast = await this.toastController.create({
        message: 'Error al actualizar el docente',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      console.error(err);
    },
  });
}


  cerrarModal() {
    this.modalController.dismiss();
  }

  convertToUpperCase(event: any, controlName: string) {
    const value = (event.target as HTMLInputElement).value.toUpperCase();
    this.formInstructor.get(controlName)?.setValue(value, { emitEvent: false });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
onInstructorChange(event: any) {
  const id = event.detail.value;
  this.selectedInstructor = this.instructores.find(i => i.id === id);

  if (this.selectedInstructor) {
    this.formInstructor.patchValue({
      nombre: this.selectedInstructor.nombre,
      apellido: this.selectedInstructor.apellido,
      correo: this.selectedInstructor.correo,
      telefono: this.selectedInstructor.telefono,
      contrasena: this.selectedInstructor.contrasena, // si decides mostrarla
      grupoId: this.selectedInstructor.grupo?.id || null,
    });

    this.fotoPreview = this.selectedInstructor.imagenBase64 || null;
  }
}

  cargarMaestros() {
  this.maestrosService.obtenerMaestros().subscribe({
    next: (res: any) => {
      this.instructores = res;
    },
    error: async (err) => {
      const toast = await this.toastController.create({
        message: 'Error al cargar instructores',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  });
}
   cargarAlumnosDelGrupo() {
    const grupoId = this.formInstructor.get('grupoId')?.value;

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
}
