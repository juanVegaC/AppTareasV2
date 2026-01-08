import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTareasComponent } from './home-tareas.component';

describe('HomeTareasComponent', () => {
  let component: HomeTareasComponent;
  let fixture: ComponentFixture<HomeTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
