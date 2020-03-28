import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboaredComponent } from './dashboared.component';

describe('DashboaredComponent', () => {
  let component: DashboaredComponent;
  let fixture: ComponentFixture<DashboaredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboaredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
