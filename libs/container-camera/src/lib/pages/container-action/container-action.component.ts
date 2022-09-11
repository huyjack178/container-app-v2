import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContainerFacade } from '../../+state';
import { ImageViewerComponent, UploadDialogComponent } from '../../components';

@Component({
  selector: 'container-management-container-action',
  templateUrl: './container-action.component.html',
  styleUrls: ['./container-action.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerActionComponent {
  @ViewChild('imageViewer') imageViewer!: ImageViewerComponent;
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    readonly facade: ContainerFacade,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  viewImages() {
    this.imageViewer.open();
  }

  upload() {
    this.dialog.open(UploadDialogComponent, {
      width: '100%',
    });
  }

  capture() {
    return this.router.navigate(['/container', 'camera'], {
      queryParamsHandling: 'preserve',
    });
  }
}
