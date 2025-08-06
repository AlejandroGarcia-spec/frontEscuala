import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, NavParams, ToastController } from '@ionic/angular';
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
  maestroSeleccionado: any;
constructor(
  private fb: FormBuilder,
  private _Service: AuthService,
  private toastController: ToastController,
  private modalController: ModalController,
  private grupoService: GrupoService,
  private maestrosService: MaestrosService,
  private readonly navParams: NavParams
) {

  this.maestroSeleccionado = this.navParams.get('maestroSeleccionado');

  this.selectedInstructor = this.maestroSeleccionado;

  this.formInstructor = this.fb.group({
    id: [null, Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]],
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
    apellido: ['', [Validators.required, Validators.maxLength(30)]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10)]],
    grupoId: ['', Validators.required],
  });

  if (this.maestroSeleccionado) {
    this.formInstructor.patchValue({
      id: this.maestroSeleccionado.id,
      nombre: this.maestroSeleccionado.nombre,
      apellido: this.maestroSeleccionado.apellido,
      correo: this.maestroSeleccionado.correo,
      telefono: this.maestroSeleccionado.telefono,
      grupoId: this.maestroSeleccionado.grupoId,
      contrasena: this.maestroSeleccionado.contrasena,
    });

    if (this.maestroSeleccionado.imagenBase64) {
      const base64 = this.maestroSeleccionado.imagenBase64;
      this.fotoPreview = base64.startsWith('data:image')
        ? base64
        : `data:image/jpeg;base64,${base64}`;
    }
  }

  this.cargarGrupos();
  this.cargarMaestros();
}
async agregarInstructor() {
  if (!this.selectedInstructor) return;

  const formValue = this.formInstructor.value;

  const { id, ...rest } = formValue;

  const maestroActualizado: any = {
    ...rest,
  };

  if (this.fotoPreview) {
    maestroActualizado.imagenBase64 = this.fotoPreview;
  }

  console.log('Datos a enviar en PATCH:', maestroActualizado);

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
      console.error('Error al actualizar:', err);
      const toast = await this.toastController.create({
        message: 'Error al actualizar el docente',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
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
        this.grupos = res;
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
