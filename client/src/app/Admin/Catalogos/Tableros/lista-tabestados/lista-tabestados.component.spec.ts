import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTabestadosComponent } from './lista-tabestados.component';

describe('ListaTabestadosComponent', () => {
  let component: ListaTabestadosComponent;
  let fixture: ComponentFixture<ListaTabestadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaTabestadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTabestadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
