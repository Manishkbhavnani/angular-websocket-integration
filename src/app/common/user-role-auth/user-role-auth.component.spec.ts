import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleAuthComponent } from './user-role-auth.component';

describe('UserRoleAuthComponent', () => {
  let component: UserRoleAuthComponent;
  let fixture: ComponentFixture<UserRoleAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
