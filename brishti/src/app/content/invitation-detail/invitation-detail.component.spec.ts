import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationDetailComponent } from './invitation-detail.component';

describe('InvitationDetailComponent', () => {
  let component: InvitationDetailComponent;
  let fixture: ComponentFixture<InvitationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
