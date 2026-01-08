import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaDetActvComponent } from './tarea-det-actv.component';

describe('TareaDetActvComponent', () => {
  let component: TareaDetActvComponent;
  let fixture: ComponentFixture<TareaDetActvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaDetActvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaDetActvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
