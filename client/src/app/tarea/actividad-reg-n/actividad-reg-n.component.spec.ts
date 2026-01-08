import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRegNComponent } from './actividad-reg-n.component';

describe('ActividadRegNComponent', () => {
  let component: ActividadRegNComponent;
  let fixture: ComponentFixture<ActividadRegNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActividadRegNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActividadRegNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
