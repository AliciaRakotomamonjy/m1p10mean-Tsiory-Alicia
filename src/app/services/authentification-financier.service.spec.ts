import { TestBed } from '@angular/core/testing';

import { AuthentificationFinancierService } from './authentification-financier.service';

describe('AuthentificationFinancierService', () => {
  let service: AuthentificationFinancierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationFinancierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
