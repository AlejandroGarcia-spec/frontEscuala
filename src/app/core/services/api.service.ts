import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly backendUrl = 'http://localhost:3000'; // Cambiar si se sube a producción

  constructor(private readonly http: HttpClient) { }
login(correo: string, contrasena: string) {
  return this.http.post(this.backendUrl + '/administradores/login/admin', { correo, contrasena });
}

loginTutor(correo: string, contrasena: string) {
  return this.http.post(this.backendUrl + '/tutores/login/tutor', { correo, contrasena });
}

loginMaestro(correo: string, contrasena: string) {
  return this.http.post(this.backendUrl + '/maestros/login/maestro', { correo, contrasena });
}



}
