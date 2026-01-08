import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaSfuncComponent } from './tarea-sfunc.component';

describe('TareaSfuncComponent', () => {
  let component: TareaSfuncComponent;
  let fixture: ComponentFixture<TareaSfuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaSfuncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaSfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
