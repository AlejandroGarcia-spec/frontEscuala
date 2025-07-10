import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado


  // Verificar si el usuario es admin
  const usuario = authService.getUsuario();
  if (usuario && usuario.rol === 'admin') {
    return true;
  } else {
    alert('No tienes acceso a esta sección');
    router.navigate(['/dashboard']);
    return false;
  }
};
