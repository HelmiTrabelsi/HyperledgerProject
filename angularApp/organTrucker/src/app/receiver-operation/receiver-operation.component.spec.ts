import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverOperationComponent } from './receiver-operation.component';

describe('ReceiverOperationComponent', () => {
  let component: ReceiverOperationComponent;
  let fixture: ComponentFixture<ReceiverOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
