import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceBiometrieComponent } from './agence-biometrie.component';

describe('AgenceBiometrieComponent', () => {
  let component: AgenceBiometrieComponent;
  let fixture: ComponentFixture<AgenceBiometrieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenceBiometrieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceBiometrieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
