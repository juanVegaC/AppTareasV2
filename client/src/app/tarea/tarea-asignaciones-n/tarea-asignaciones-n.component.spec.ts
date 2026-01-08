import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaAsignacionesNComponent } from './tarea-asignaciones-n.component';

describe('TareaAsignacionesNComponent', () => {
  let component: TareaAsignacionesNComponent;
  let fixture: ComponentFixture<TareaAsignacionesNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaAsignacionesNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaAsignacionesNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
