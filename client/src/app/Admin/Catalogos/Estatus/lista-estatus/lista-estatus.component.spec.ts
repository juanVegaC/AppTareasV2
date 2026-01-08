import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstatusComponent } from './lista-estatus.component';

describe('ListaEstatusComponent', () => {
  let component: ListaEstatusComponent;
  let fixture: ComponentFixture<ListaEstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaEstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
