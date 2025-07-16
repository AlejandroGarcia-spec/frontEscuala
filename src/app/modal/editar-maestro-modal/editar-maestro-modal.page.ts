import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

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
  constructor(
    private fb: FormBuilder,
    private _Service: AuthService,
    private toastController: ToastController,
    private modalController: ModalController,
  ) {
    this.formInstructor = this.fb.group({
      matricula: ['', [Validators.required,Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required,Validators.maxLength(30)]],
      apellido1: ['', [Validators.required,Validators.maxLength(30)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10)]],
    });
  }

  async agregarInstructor() {

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
  }

}
