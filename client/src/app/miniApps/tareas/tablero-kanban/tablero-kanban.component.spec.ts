import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroKanbanComponent } from './tablero-kanban.component';

describe('TableroKanbanComponent', () => {
  let component: TableroKanbanComponent;
  let fixture: ComponentFixture<TableroKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableroKanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableroKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
