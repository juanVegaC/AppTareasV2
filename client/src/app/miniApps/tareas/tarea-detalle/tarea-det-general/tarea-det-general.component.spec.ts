import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaDetGeneralComponent } from './tarea-det-general.component';

describe('TareaDetGeneralComponent', () => {
  let component: TareaDetGeneralComponent;
  let fixture: ComponentFixture<TareaDetGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaDetGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaDetGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
