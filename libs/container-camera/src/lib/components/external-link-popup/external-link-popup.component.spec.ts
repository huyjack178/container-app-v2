import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLinkPopupComponent } from './external-link-popup.component';

describe('ExternalLinkPopupComponent', () => {
  let component: ExternalLinkPopupComponent;
  let fixture: ComponentFixture<ExternalLinkPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalLinkPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLinkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
