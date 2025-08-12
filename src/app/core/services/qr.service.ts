import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QrService {
 private apiUrl = 'http://localhost:3000/qr'; // Cambia según tu IP y puerto

  constructor(private http: HttpClient) {}

  obtenerDatosQR(tutorId: number, alumnoId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/tutores/${tutorId}/alumnos/${alumnoId}/datos-qr`
    );
  }


}
