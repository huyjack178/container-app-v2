import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerFacade } from '../../+state';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'container-management-photo-carousel-dialog',
  templateUrl: './photo-carousel-dialog.component.html',
  styleUrls: ['./photo-carousel-dialog.component.scss'],
})
export class PhotoCarouselDialogComponent {
  constructor(
    readonly facade: ContainerFacade,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) {}

  deleteImage = (index: number, imageLength: number) => {
    this.facade.deleteImage(index);
    this.changeDetector.detectChanges();
    if (index == imageLength - 1) {
      this.dialog.closeAll();
    }
  };
}
