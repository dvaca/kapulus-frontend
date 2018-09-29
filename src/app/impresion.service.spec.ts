import { TestBed, inject } from '@angular/core/testing';

import { ImpresionService } from './impresion.service';

describe('ImpresionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImpresionService]
    });
  });

  it('should be created', inject([ImpresionService], (service: ImpresionService) => {
    expect(service).toBeTruthy();
  }));
});
