import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private readonly apiUrl = 'http://localhost:3000/alumnos'; // Ajusta si es diferente

  constructor(private readonly http: HttpClient) {}

  // Crear alumno
  crearAlumno(alumno: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, alumno);
  }

  // Obtener todos los alumnos
  obtenerAlumnos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener alumno por ID
  obtenerAlumnoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Obtener alumnos por tutor
  obtenerPorTutor(idTutor: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tutor/${idTutor}`);
  }

  // Obtener alumnos por grupo
  obtenerPorGrupo(idGrupo: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/grupo/${idGrupo}`);
  }

  // Actualizar alumno
  actualizarAlumno(id: number, alumno: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, alumno);
  }

  // Eliminar alumno
  eliminarAlumno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // alumnos.service.ts (Angular)
obtenerPorMaestro(idMaestro: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/maestro/${idMaestro}/alumnos`);
}

}
