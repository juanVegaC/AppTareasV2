import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRegComponent } from './actividad-reg.component';

describe('ActividadRegComponent', () => {
  let component: ActividadRegComponent;
  let fixture: ComponentFixture<ActividadRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActividadRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActividadRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
