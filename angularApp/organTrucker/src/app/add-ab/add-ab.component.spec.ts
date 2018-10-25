import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddABComponent } from './add-ab.component';

describe('AddABComponent', () => {
  let component: AddABComponent;
  let fixture: ComponentFixture<AddABComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddABComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddABComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
