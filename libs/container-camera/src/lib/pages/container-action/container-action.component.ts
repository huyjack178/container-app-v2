import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoCarouselDialogComponent } from '../../components/photo-carousel-dialog/photo-carousel-dialog.component';
import { UploadDialogComponent } from '../../components/upload-dialog/upload-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'container-management-container-action',
  templateUrl: './container-action.component.html',
  styleUrls: ['./container-action.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerActionComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  viewImages() {
    this.dialog.open(PhotoCarouselDialogComponent, {
      width: '100%',
    });
  }

  upload() {
    this.dialog.open(UploadDialogComponent, {
      width: '100%',
    });
  }

  capture() {
    return this.router.navigateByUrl('/container');
  }
}
