import { TestBed } from '@angular/core/testing';

import { JwtQrService } from './jwt-qr.service';

describe('JwtQrService', () => {
  let service: JwtQrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtQrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
