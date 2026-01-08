import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaDetalleHomeComponent } from './tarea-detalle-home.component';

describe('TareaDetalleHomeComponent', () => {
  let component: TareaDetalleHomeComponent;
  let fixture: ComponentFixture<TareaDetalleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaDetalleHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaDetalleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
