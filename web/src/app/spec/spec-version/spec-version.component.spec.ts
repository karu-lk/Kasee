import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecVersionComponent } from './spec-version.component';

describe('SpecVersionComponent', () => {
  let component: SpecVersionComponent;
  let fixture: ComponentFixture<SpecVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
