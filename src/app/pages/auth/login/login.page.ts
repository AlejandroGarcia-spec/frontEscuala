import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderPage } from "src/app/componentes/header/header.page";
import { ApiService } from 'src/app/core/services/api.service';
  // ajusta ruta según tu estructura

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule],
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  correo: string = '';
  contrasena: string = '';
  rol: string = '';
  email: string = ''; // Nuevo campo para el emailmostrarContrasena: boolean = false;
mostrarContrasena: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {
    this.route.queryParams.subscribe(params => {
      this.rol = params['rol'];
    });
  }
onSubmit() {
  if (!this.correo || !this.contrasena) {
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
