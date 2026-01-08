import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMisPuestosComponent } from './lista-mis-puestos.component';

describe('ListaMisPuestosComponent', () => {
  let component: ListaMisPuestosComponent;
  let fixture: ComponentFixture<ListaMisPuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaMisPuestosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMisPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
