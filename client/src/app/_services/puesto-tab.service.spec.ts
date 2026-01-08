import { TestBed } from '@angular/core/testing';

import { PuestoTabService } from './puesto-tab.service';

describe('PuestoTabService', () => {
  let service: PuestoTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestoTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
