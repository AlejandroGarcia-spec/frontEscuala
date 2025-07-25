import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly backendUrl = 'http://localhost:3000'; // Cambiar si se sube a producción

  constructor(private readonly http: HttpClient) { }
 login(correo: string, contrasena: string, rol: string) {
  const endpoint = `/administradores/login/${rol}`;
  return this.http.post(this.backendUrl + endpoint, { correo, contrasena });
}


}
