import { TestBed } from '@angular/core/testing';

import { Producto.ServiceService } from './producto.service.service';

describe('Producto.ServiceService', () => {
  let service: Producto.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Producto.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
