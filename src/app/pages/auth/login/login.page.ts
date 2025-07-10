import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonicModule, FormsModule, RouterModule ]
})
export class LoginPage {
  email = '';
  password = '';
  perfil = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.perfil = this.route.snapshot.routeConfig?.path?.split('/').pop() || '';
  }

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Faltan campos');
      return;
    }

    this.auth.login(this.email, this.password).subscribe({
      next: ({ usuario }) => {
        if (usuario.rol !== this.perfil) {
          alert(`No tienes acceso como ${this.perfil}`);
          return;
        }

        // Redirección según rol
        if (usuario.rol === 'admin') this.router.navigate(['/admin']);
        else if (usuario.rol === 'maestro') this.router.navigate(['/dashboard']);
        else if (usuario.rol === 'tutor') this.router.navigate(['/tutores/lista']);
      },
      error: () => alert('Credenciales inválidas')
    });
  }
}
