import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QrService {
 private apiUrl = 'https://backescolar-production.up.railway.app/qr'; // Cambia según tu IP y puerto

  constructor(private http: HttpClient) {}

  obtenerDatosQR(tutorId: number, alumnoId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/tutores/${tutorId}/alumnos/${alumnoId}/datos-qr`
    );
  }


}
