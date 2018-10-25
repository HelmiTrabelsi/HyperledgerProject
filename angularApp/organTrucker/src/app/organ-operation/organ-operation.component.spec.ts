import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganOperationComponent } from './organ-operation.component';

describe('OrganOperationComponent', () => {
  let component: OrganOperationComponent;
  let fixture: ComponentFixture<OrganOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
