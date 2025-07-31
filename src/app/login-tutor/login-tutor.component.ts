import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-tutor',
  standalone: true,
  templateUrl: './login-tutor.component.html',
  styleUrls: ['./login-tutor.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule 
  ]
})
export class LoginTutorComponent {
  usuario: string = '';
  contrasena: string = '';

  
  usuariosValidos = [
    { usuario: 'tutor1', contrasena: '1234', grado: 2 },
    { usuario: 'tutor2', contrasena: '5678', grado: 3 }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async iniciarSesion() {
    const tutor = this.usuariosValidos.find(
      u => u.usuario === this.usuario && u.contrasena === this.contrasena
    );

    if (tutor) {
      (document.activeElement as HTMLElement)?.blur();
      localStorage.setItem('logueado', 'true');
      localStorage.setItem('grado', tutor.grado.toString());

      this.router.navigate(['/tutores/perfil']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
