import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoAddComponent } from './texto-add.component';

describe('TextoAddComponent', () => {
  let component: TextoAddComponent;
  let fixture: ComponentFixture<TextoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextoAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
