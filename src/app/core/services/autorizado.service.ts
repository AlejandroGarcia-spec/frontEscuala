// autorizado.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutorizadoService {
  private apiUrl = 'http://localhost:3000'; // tu backend Nest

  constructor(private http: HttpClient) {}

  getFotoAutorizado(tipo: 'tutor' | 'familiar', id: number): Observable<any> {
    if (tipo === 'tutor') {
      return this.http.get(`${this.apiUrl}/tutores/${id}`);
    } else {
      return this.http.get(`${this.apiUrl}/conocidos/get/${id}`);
    }
  }
}
