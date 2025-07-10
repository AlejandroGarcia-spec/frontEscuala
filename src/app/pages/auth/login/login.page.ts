import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderPage } from "src/app/componentes/header/header.page";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule, HeaderPage],
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  rol: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.rol = params['rol'];
    });
  }

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Simulamos login y guardamos el usuario con rol
    const usuario = {
      email: this.email,
      rol: this.rol // este rol lo recibimos desde la URL
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Redirigir por rol
    if (this.rol === 'admin') {
      this.router.navigate(['/admin']);
    } else if (this.rol === 'maestro') {
      this.router.navigate(['/dashboard']);
    } else if (this.rol === 'tutor') {
      this.router.navigate(['/home']); // o su propio módulo
    } else {
      alert('Rol desconocido');
    }
  }
}
