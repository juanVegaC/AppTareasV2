import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoEditComponent } from './texto-edit.component';

describe('TextoEditComponent', () => {
  let component: TextoEditComponent;
  let fixture: ComponentFixture<TextoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
