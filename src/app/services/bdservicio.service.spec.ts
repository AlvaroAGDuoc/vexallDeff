import { TestBed } from '@angular/core/testing';

import { BdservicioService } from './bdservicio.service';

describe('BdservicioService', () => {
  let service: BdservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
