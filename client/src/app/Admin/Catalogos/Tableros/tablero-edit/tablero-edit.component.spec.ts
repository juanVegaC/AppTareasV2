import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroEditComponent } from './tablero-edit.component';

describe('TableroEditComponent', () => {
  let component: TableroEditComponent;
  let fixture: ComponentFixture<TableroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableroEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
