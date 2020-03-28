import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboaredComponent } from './user-dashboared.component';

describe('UserDashboaredComponent', () => {
  let component: UserDashboaredComponent;
  let fixture: ComponentFixture<UserDashboaredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboaredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
