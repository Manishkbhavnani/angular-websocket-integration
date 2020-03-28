import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpUserSComponent } from './sign-up-user.component';

describe('SignUpUserSComponent', () => {
  let component: SignUpUserSComponent;
  let fixture: ComponentFixture<SignUpUserSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpUserSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpUserSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
