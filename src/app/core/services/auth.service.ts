import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  isAuthenticated(): boolean {
  const usuario = this.getUsuario();
  return !!usuario; // retorna true si existe un usuario
}

  login(email: string, password: string): Observable<any> {
    // Simulación de usuarios (puedes cambiar esto por una API real)
    const usuarios = [
      { email: 'admin@correo.com', password: '1234', rol: 'admin' },
      { email: 'maestro@correo.com', password: '1234', rol: 'maestro' },
      { email: 'tutor@correo.com', password: '1234', rol: 'tutor' },
    ];

    const usuario = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (!usuario) return throwError(() => new Error('Credenciales inválidas'));

    // Guardar en localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    return of({ usuario });
  }

  getUsuario() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']); // ← Redirige al home (ajusta la ruta si es distinta)
  }
}
