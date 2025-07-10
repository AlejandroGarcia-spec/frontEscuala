import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Decodificamos el payload para revisar el rol
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));

    if (payload.role === 'admin') {
      return true;
    } else {
      router.navigate(['/unauthorized']); // Ruta para acceso denegado (puedes crearla)
      return false;
    }
  } catch {
    router.navigate(['/auth/login']);
    return false;
  }
};
