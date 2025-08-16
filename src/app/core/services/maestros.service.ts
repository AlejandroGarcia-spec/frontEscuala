import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {
 private apiUrl = 'https://backescuelapruebaproduccion-production.up.railway.app/maestros'; // Cambia según tu IP y puerto
  constructor(private readonly http: HttpClient) { }
  agregarMaestro(maestroData: any) {
  return this.http.post(this.apiUrl, maestroData);
}
  // GET: Obtener un maestro por ID
  obtenerMaestroPorId(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // PATCH: Actualizar maestro
  actualizarMaestro(id: number, maestroData: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, maestroData);
  }

  // DELETE: Eliminar maestro
  eliminarMaestro(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  obtenerMaestros() {
  return this.http.get(this.apiUrl);
}

}
