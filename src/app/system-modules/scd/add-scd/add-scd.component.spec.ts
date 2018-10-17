import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScdComponent } from './add-scd.component';

describe('AddScdComponent', () => {
  let component: AddScdComponent;
  let fixture: ComponentFixture<AddScdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
