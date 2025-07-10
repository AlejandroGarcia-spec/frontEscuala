import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { maestroGuard } from './maestro.guard';

describe('maestroGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => maestroGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
