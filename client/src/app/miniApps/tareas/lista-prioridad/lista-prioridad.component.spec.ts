import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrioridadComponent } from './lista-prioridad.component';

describe('ListaPrioridadComponent', () => {
  let component: ListaPrioridadComponent;
  let fixture: ComponentFixture<ListaPrioridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPrioridadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPrioridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
