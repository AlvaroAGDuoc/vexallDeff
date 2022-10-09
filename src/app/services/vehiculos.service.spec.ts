import { TestBed } from '@angular/core/testing';

import { Vehiculos } from './vehiculos.service';

describe('VehiculosService', () => {
  let service: Vehiculos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vehiculos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
