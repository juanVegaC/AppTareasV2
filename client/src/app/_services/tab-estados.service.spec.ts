import { TestBed } from '@angular/core/testing';

import { TabEstadosService } from './tab-estados.service';

describe('TabEstadosService', () => {
  let service: TabEstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabEstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
