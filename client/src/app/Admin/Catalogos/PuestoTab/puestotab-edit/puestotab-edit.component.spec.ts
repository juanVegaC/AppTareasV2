import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestotabEditComponent } from './puestotab-edit.component';

describe('PuestotabEditComponent', () => {
  let component: PuestotabEditComponent;
  let fixture: ComponentFixture<PuestotabEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuestotabEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuestotabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
