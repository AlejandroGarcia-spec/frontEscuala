import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { TutoresService } from 'src/app/core/services/tutores.service';

interface Grupo {
  id: number;
  nombre: string;
}

interface Alumno {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-agregar-tutor-modal',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-tutor-modal.page.html',
  styleUrls: ['./agregar-tutor-modal.page.scss'],
})
export class AgregarTutorModalPage {
  tutor = {
    nombre: '',
    apellido: '',
    telefono: null,
    email: '',
    contrasena: '',
    imagenBase64: ''
  };
  tutorForm: FormGroup;
  showPassword: boolean = false;

  fotoPreview: string | ArrayBuffer | null = null;
  fotoFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private toastController: ToastController,
    private tutoresService: TutoresService,
    private grupoService: GrupoService
  ) {
    this.tutorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });


  }
guardarTutor(): void {
  if (this.tutorForm.invalid) return;

  const tutor = {
    nombre: this.tutorForm.value.nombre,
    apellido: this.tutorForm.value.apellido,
    telefono: Number(this.tutorForm.value.telefono),
    correo: this.tutorForm.value.correo,
    contrasena: this.tutorForm.value.password,
    imagenBase64: this.tutor.imagenBase64 || null,
  };

  this.tutoresService.crearTutor(tutor).subscribe({
    next: async () => {
      const toast = await this.toastController.create({
        message: 'Tutor guardado con éxito',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.cerrarModal();
    },
    error: async () => {
      const toast = await this.toastController.create({
        message: 'Error al guardar tutor',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  });
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.tutor.imagenBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}


  cerrarModal(): void {
    this.modalController.dismiss();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  onImageSelected(event: any) {
  this.onFileSelected(event);
}


}
