import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { TutoresService } from 'src/app/core/services/tutores.service';

@Component({
  selector: 'app-editar-tutor-modal',
  templateUrl: './editar-tutor-modal.page.html',
  styleUrls: ['./editar-tutor-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class EditarTutorModalPage implements OnInit {
  tutorForm!: FormGroup;
  instructores: any[] = [];
  showPassword: boolean = false;
  fotoPreview: string | ArrayBuffer | null = null;
  fotoFile: File | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastController: ToastController,
    private readonly modalController: ModalController,
    private readonly tutorService: TutoresService
  ) {}

  ngOnInit() {
  this.tutorForm = this.fb.group({
  tutor_id: ['', Validators.required],
  nombre: ['', Validators.required],
  apellido: ['', Validators.required],
  correo: ['', [Validators.required, Validators.email]],
  telefono: ['', Validators.required],
  contrasena: ['', [Validators.required, Validators.minLength(8)]],
  imagenBase64: ['']
});

    this.obtenerTutores();
  }

  obtenerTutores() {
    this.tutorService.obtenerTutores().subscribe({
      next: (res: any) => {
        this.instructores = res;
      },
      error: () => this.mostrarToast('Error al cargar tutores'),
    });
  }

  onInstructorChange(event: any) {
    const id = event.detail.value;
    const tutor = this.instructores.find(t => t.id === id);
    if (tutor) {
      this.tutorForm.patchValue({
  tutor_id: tutor.id,
  nombre: tutor.nombre,
  apellido: tutor.apellido,
  correo: tutor.correo,
  telefono: tutor.telefono,
  contrasena: tutor.contrasena,
  imagenBase64: tutor.imagenBase64 || ''
});

      this.fotoPreview = tutor.imagenBase64;
    }
  }

 guardarTutor() {
  const datos = this.tutorForm.value;
  datos.telefono = Number(datos.telefono); // importante

  if (this.fotoFile) {
    const reader = new FileReader();
    reader.onload = () => {
      datos.imagenBase64 = reader.result as string;
      this.enviarActualizacion(datos);
    };
    reader.readAsDataURL(this.fotoFile);
  } else {
    this.enviarActualizacion(datos);
  }
}
enviarActualizacion(datos: any) {
  const id = datos.tutor_id;
  delete datos.tutor_id; // lo quitamos para evitar validación fallida

  this.tutorService.editarTutor(id, datos).subscribe({
    next: () => {
      this.mostrarToast('Tutor actualizado correctamente');
      this.cerrarModal();
    },
    error: () => this.mostrarToast('Error al actualizar tutor'),
  });
}


  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fotoFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreview = reader.result;
      };
      reader.readAsDataURL(this.fotoFile);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }
}
