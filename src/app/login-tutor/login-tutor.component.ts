import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonLabel, IonHeader, IonToolbar, IonContent } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { usuario, password } = this.loginForm.value;
      console.log('Tutor login:', { usuario, password });
      
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
