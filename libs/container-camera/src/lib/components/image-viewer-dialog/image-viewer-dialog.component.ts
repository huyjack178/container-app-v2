import {Component, EventEmitter, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'container-management-image-viewer-dialog',
  templateUrl: './image-viewer-dialog.component.html',
  styleUrls: ['./image-viewer-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ImageViewerDialogComponent {
  onClickImage = new EventEmitter()

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  clickImage() {
    this.onClickImage.emit();
  }
}
