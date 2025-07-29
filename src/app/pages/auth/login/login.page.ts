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

 this.apiService.login(this.correo, this.contrasena, this.rol).subscribe({
  next: (res: any) => {
    let usuario;

    if (this.rol === 'admin') {
      usuario = {
        correo: res.admin.correo,
        nombre: res.admin.nombre,
        rol: this.rol
      };
      this.router.navigate(['/admin']);
    } else if (this.rol === 'maestro') {
      usuario = {
        correo: res.maestro.correo,
        nombre: res.maestro.nombre,
        rol: this.rol
      };
      this.router.navigate(['/dashboard']);
    } else if (this.rol === 'tutor') {
      usuario = {
        correo: res.tutor.correo,
        nombre: res.tutor.nombre,
        rol: this.rol
      };
      this.router.navigate(['/padres-home']);
    } else {
      alert('Rol desconocido');
      return;
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
  },
  error: (err) => {
    alert('Correo o contraseña incorrectos');
    console.error(err);
  }
});
  }
}
