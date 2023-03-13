import {Component, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ContainerFacade} from "../../+state";
import {MatDialog} from "@angular/material/dialog";
import {ImageViewerDialogComponent} from "../image-viewer-dialog/image-viewer-dialog.component";

@Component({
  selector: 'container-management-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PhotoGridComponent {
  constructor(
    readonly containerFacade: ContainerFacade,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog
  ) {
  }

  convertBlobToUrl(blob: Blob) {
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  deleteImage = (index: number) => {
    this.containerFacade.deleteImage(index);
  };


  viewImage(safeUrl: SafeUrl) {
    const ref = this.dialog.open(ImageViewerDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      maxWidth: '90vw',
      maxHeight: '100vh',
      data: {
        imageSrc: safeUrl
      }
    });

    ref.componentInstance.onClickImage.subscribe(() => {
      ref.close();
    })
  }
}
