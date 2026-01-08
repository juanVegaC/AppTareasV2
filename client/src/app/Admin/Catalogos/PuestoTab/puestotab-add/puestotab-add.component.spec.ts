import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestotabAddComponent } from './puestotab-add.component';

describe('PuestotabAddComponent', () => {
  let component: PuestotabAddComponent;
  let fixture: ComponentFixture<PuestotabAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuestotabAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuestotabAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
