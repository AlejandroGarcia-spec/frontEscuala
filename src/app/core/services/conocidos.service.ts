import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConocidosService {
  private apiUrl = 'https://backescolar-production.up.railway.app/conocidos'; // Cambia por tu URL real

  constructor(private http: HttpClient) {}

  getByTutorId(tutorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tutor/${tutorId}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }
}
