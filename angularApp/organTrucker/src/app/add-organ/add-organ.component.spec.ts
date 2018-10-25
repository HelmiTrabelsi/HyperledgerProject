import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganComponent } from './add-organ.component';

describe('AddOrganComponent', () => {
  let component: AddOrganComponent;
  let fixture: ComponentFixture<AddOrganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
