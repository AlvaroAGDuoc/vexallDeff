import { TestBed } from '@angular/core/testing';

import { ApiCamaraService } from './api-camara.service';

describe('ApiCamaraService', () => {
  let service: ApiCamaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCamaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
