import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCarouselDialogComponent } from './photo-carousel-dialog.component';

describe('PhotoCarouselDialogComponent', () => {
  let component: PhotoCarouselDialogComponent;
  let fixture: ComponentFixture<PhotoCarouselDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoCarouselDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCarouselDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
