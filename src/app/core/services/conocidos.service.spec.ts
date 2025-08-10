import { TestBed } from '@angular/core/testing';

import { ConocidosService } from './conocidos.service';

describe('ConocidosService', () => {
  let service: ConocidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConocidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
