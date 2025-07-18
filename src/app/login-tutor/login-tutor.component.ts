import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


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
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { usuario, password } = this.loginForm.value;

      const success = this.auth.login(usuario, password);

      if (success) {
        
        this.router.navigate(['/tutores/lista']);
      } else {
        alert('Usuario o contraseña incorrectos o no eres tutor.');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
