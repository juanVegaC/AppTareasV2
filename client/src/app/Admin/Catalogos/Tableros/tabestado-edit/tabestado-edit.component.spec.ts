import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabestadoEditComponent } from './tabestado-edit.component';

describe('TabestadoEditComponent', () => {
  let component: TabestadoEditComponent;
  let fixture: ComponentFixture<TabestadoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabestadoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabestadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
