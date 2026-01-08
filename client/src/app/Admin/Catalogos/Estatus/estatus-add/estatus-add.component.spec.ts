import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusAddComponent } from './estatus-add.component';

describe('EstatusAddComponent', () => {
  let component: EstatusAddComponent;
  let fixture: ComponentFixture<EstatusAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstatusAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstatusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
