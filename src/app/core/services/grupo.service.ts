import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Grupo {
  id: number;
  nombre: string;
  createdAt?: string;
  alumnos?: any[]; // Opcional si necesitas cargar los alumnos
  maestros?: any[]; // Opcional si necesitas cargar los maestros
}

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private readonly apiUrl = 'http://localhost:3000/grupos'; // Asegúrate que sea la ruta correcta

  constructor(private readonly http: HttpClient) {}

  // Obtener todos los grupos
  obtenerGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.apiUrl}/getAll`);
  }

  // Obtener grupo por ID
  obtenerGrupoPorId(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.apiUrl}/${id}`);
  }


  // Crear grupo
  crearGrupo(data: { nombre: string }) {
    return this.http.post(`${this.apiUrl}/post`, data);
  }


  // Actualizar grupo
  actualizarGrupo(id: number, grupo: Partial<Grupo>): Observable<Grupo> {
    return this.http.patch<Grupo>(`${this.apiUrl}/${id}`, grupo);
  }

  // Eliminar grupo
  eliminarGrupo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
