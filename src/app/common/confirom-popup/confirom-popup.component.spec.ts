import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiromPopupComponent } from './confirom-popup.component';

describe('ConfiromPopupComponent', () => {
  let component: ConfiromPopupComponent;
  let fixture: ComponentFixture<ConfiromPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiromPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiromPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
