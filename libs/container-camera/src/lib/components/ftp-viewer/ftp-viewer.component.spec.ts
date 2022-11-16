import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpViewerComponent } from './ftp-viewer.component';

describe('FtpViewerComponent', () => {
  let component: FtpViewerComponent;
  let fixture: ComponentFixture<FtpViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtpViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FtpViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
