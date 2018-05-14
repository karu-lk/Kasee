import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecDetailsComponent } from './spec-details.component';

describe('SpecDetailsComponent', () => {
  let component: SpecDetailsComponent;
  let fixture: ComponentFixture<SpecDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
