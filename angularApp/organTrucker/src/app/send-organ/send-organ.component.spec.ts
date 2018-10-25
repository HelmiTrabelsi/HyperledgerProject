import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOrganComponent } from './send-organ.component';

describe('SendOrganComponent', () => {
  let component: SendOrganComponent;
  let fixture: ComponentFixture<SendOrganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOrganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOrganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
