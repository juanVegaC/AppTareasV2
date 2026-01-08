import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroAddComponent } from './tablero-add.component';

describe('TableroAddComponent', () => {
  let component: TableroAddComponent;
  let fixture: ComponentFixture<TableroAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableroAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableroAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
