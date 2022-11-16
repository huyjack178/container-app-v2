import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpImageViewerComponent } from './ftp-image-viewer.component';

describe('FtpImageViewerComponent', () => {
  let component: FtpImageViewerComponent;
  let fixture: ComponentFixture<FtpImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtpImageViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FtpImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
