import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly router: Router,  private  readonly http: HttpClient) {}
  isAuthenticated(): boolean {
  const usuario = this.getUsuario();
  return !!usuario; // retorna true si existe un usuario
}
  getUsuario() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']); // ← Redirige al home (ajusta la ruta si es distinta)
  }

getAdminByCorreo(correo: string) {
  return this.http.get(`http://localhost:3000/administradores/perfil/${correo}`);
}


}
 