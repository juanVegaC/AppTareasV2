import { TestBed } from '@angular/core/testing';

import { TareaPuestoTabService } from './tarea-puesto-tab.service';

describe('TareaPuestoTabService', () => {
  let service: TareaPuestoTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaPuestoTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
