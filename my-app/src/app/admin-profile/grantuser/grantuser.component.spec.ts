import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantuserComponent } from './grantuser.component';

describe('GrantuserComponent', () => {
  let component: GrantuserComponent;
  let fixture: ComponentFixture<GrantuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
