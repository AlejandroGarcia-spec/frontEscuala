import { CanActivateFn } from '@angular/router';

export const maestroGuard: CanActivateFn = (route, state) => {
  return true;
};
