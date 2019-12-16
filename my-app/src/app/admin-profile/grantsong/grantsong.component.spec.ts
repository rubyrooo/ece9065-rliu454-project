import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantsongComponent } from './grantsong.component';

describe('GrantsongComponent', () => {
  let component: GrantsongComponent;
  let fixture: ComponentFixture<GrantsongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantsongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
