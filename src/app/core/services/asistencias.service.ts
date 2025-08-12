import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  private readonly apiUrl = 'http://localhost:3000/entradas';

  constructor(private readonly http: HttpClient) { }

  registrarEntrada(alumnoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, { alumnoId });
  }

  eliminarEntrada(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getEntradasPorGrupo(idGrupo: number) {
    return this.http.get<any[]>(`${this.apiUrl}/grupo/${idGrupo}`);
  }

  getHijosConEstado(tutorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hijos/${tutorId}`);
  }
}
