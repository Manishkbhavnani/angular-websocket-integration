import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { digi-cropLoaderComponent } from './digi-crop-loader.component';

describe('digi-cropLoaderComponent', () => {
  let component: digi-cropLoaderComponent;
  let fixture: ComponentFixture<digi-cropLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ digi-cropLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(digi-cropLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
