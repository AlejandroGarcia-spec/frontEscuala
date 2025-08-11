import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateSalidaDto {
  alumnoId: number;
  nombre_Recoge: string;
}

export interface UpdateSalidaDto {
  alumnoId?: number;
  nombre_Recoge?: string;
}

export interface Salida {
  id: number;
  Date: string;
  nombre_Recoge: string;
  alumnoId: number;
  alumno: {
    id: number;
    nombre: string;
    apellido?: string;
    grado?: string;
    grupo?: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SalidasService {
  private readonly apiUrl = 'http://localhost:3000/salidas';

  constructor(private readonly http: HttpClient) {}

  // Crear salida
  crearSalida(createSalidaDto: CreateSalidaDto): Observable<Salida> {
    return this.http.post<Salida>(this.apiUrl, createSalidaDto);
  }

  // Obtener todas las salidas
  obtenerSalidas(): Observable<Salida[]> {
    return this.http.get<Salida[]>(this.apiUrl);
  }

  // Obtener salida por ID
  obtenerSalidaPorId(id: number): Observable<Salida> {
    return this.http.get<Salida>(`${this.apiUrl}/${id}`);
  }

  // Actualizar salida
  actualizarSalida(id: number, updateSalidaDto: UpdateSalidaDto): Observable<Salida> {
    return this.http.patch<Salida>(`${this.apiUrl}/${id}`, updateSalidaDto);
  }

  // Eliminar salida
  eliminarSalida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener salidas por fecha
  obtenerSalidasPorFecha(fecha: string): Observable<Salida[]> {
    return this.http.get<Salida[]>(`${this.apiUrl}?fecha=${fecha}`);
  }

  // Obtener salidas por alumno
  obtenerSalidasPorAlumno(alumnoId: number): Observable<Salida[]> {
    return this.http.get<Salida[]>(`${this.apiUrl}?alumnoId=${alumnoId}`);
  }
}