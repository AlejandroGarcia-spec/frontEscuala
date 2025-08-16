import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private apiUrl = 'https://backescuelapruebaproduccion-production.up.railway.app/grupos'; // Cambia según tu IP y puerto

  constructor(private http: HttpClient) {}

  crearGrupo(data: { nombre: string }) {
    return this.http.post(`${this.apiUrl}/post`, data);
  }

  obtenerGrupos() {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  eliminarGrupo(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  actualizarGrupo(id: number, data: { nombre: string }) {
    return this.http.patch(`${this.apiUrl}/update/${id}`, data);
  }
}
