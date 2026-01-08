import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTextosComponent } from './lista-textos.component';

describe('ListaTextosComponent', () => {
  let component: ListaTextosComponent;
  let fixture: ComponentFixture<ListaTextosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaTextosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTextosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
