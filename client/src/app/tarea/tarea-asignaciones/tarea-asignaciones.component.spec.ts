import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaAsignacionesComponent } from './tarea-asignaciones.component';

describe('TareaAsignacionesComponent', () => {
  let component: TareaAsignacionesComponent;
  let fixture: ComponentFixture<TareaAsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaAsignacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
