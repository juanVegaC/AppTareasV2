import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPuestotabComponent } from './lista-puestotab.component';

describe('ListaPuestotabComponent', () => {
  let component: ListaPuestotabComponent;
  let fixture: ComponentFixture<ListaPuestotabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPuestotabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPuestotabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
