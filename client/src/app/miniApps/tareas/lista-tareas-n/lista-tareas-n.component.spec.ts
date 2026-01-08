import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTareasNComponent } from './lista-tareas-n.component';

describe('ListaTareasNComponent', () => {
  let component: ListaTareasNComponent;
  let fixture: ComponentFixture<ListaTareasNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaTareasNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTareasNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
