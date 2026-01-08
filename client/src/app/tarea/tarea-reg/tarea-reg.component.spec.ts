import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaRegComponent } from './tarea-reg.component';

describe('TareaRegComponent', () => {
  let component: TareaRegComponent;
  let fixture: ComponentFixture<TareaRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
