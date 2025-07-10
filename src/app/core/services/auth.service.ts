import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://tu-backend/api'; // Cambia esto a la URL real de tu backend

  private currentUserRole = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    // Si ya hay token en localStorage al iniciar el servicio, extraemos el rol
    const token = this.getToken();
    if (token) {
      const payload = this.parseJwt(token);
      this.currentUserRole.next(payload?.role || null);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        const payload = this.parseJwt(res.token);
        this.currentUserRole.next(payload?.role || null);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserRole.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para decodificar el payload del JWT
  private parseJwt(token: string): any {
    try {
      const base64Payload = token.split('.')[1];
      const payload = atob(base64Payload);
      return JSON.parse(payload);
    } catch (e) {
      return null;
    }
  }
}
