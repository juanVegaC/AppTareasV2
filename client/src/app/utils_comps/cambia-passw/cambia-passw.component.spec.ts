import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiaPasswComponent } from './cambia-passw.component';

describe('CambiaPasswComponent', () => {
  let component: CambiaPasswComponent;
  let fixture: ComponentFixture<CambiaPasswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiaPasswComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambiaPasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
