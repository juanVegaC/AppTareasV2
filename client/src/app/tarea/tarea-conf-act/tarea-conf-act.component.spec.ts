import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaConfActComponent } from './tarea-conf-act.component';

describe('TareaConfActComponent', () => {
  let component: TareaConfActComponent;
  let fixture: ComponentFixture<TareaConfActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaConfActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaConfActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
