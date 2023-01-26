import { TestBed } from '@angular/core/testing';

import { AuthentificationAtelierService } from './authentification-atelier.service';

describe('AuthentificationAtelierService', () => {
  let service: AuthentificationAtelierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationAtelierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
