import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaAsignaComponent } from './tarea-asigna.component';

describe('TareaAsignaComponent', () => {
  let component: TareaAsignaComponent;
  let fixture: ComponentFixture<TareaAsignaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaAsignaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaAsignaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
