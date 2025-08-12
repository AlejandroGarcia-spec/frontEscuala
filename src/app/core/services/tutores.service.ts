import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutoresService {
  private readonly apiUrl = 'http://localhost:3000/tutores';

  constructor(private readonly http: HttpClient) { }

  crearTutor(tutor: any) {
    return this.http.post(this.apiUrl, tutor); // JSON puro
  }
  obtenerTutores() {
    return this.http.get(this.apiUrl);
  }

  editarTutor(id: number, datos: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, datos);
  }

  obtenerTutorPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarTutor(id: number, tutor: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, tutor);
  }


  eliminarTutor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
