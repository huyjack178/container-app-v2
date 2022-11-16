import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContainerFacade } from '../../+state';
import { ImageViewerComponent, UploadDialogComponent } from '../../components';
import { map } from 'rxjs';
import { SettingService } from '@container-management/setting';
import { FtpViewerComponent } from '../../components/ftp-viewer/ftp-viewer.component';

@Component({
  selector: 'container-management-container-action',
  templateUrl: './container-action.component.html',
  styleUrls: ['./container-action.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerActionComponent {
  @ViewChild('imageViewer') imageViewer!: ImageViewerComponent;

  readonly hasNoImage$ = this.facade.selectImages$.pipe(
    map((images) => images.length === 0)
  );

  readonly ftpPath$ = this.facade.ftpPath$;

  constructor(
    readonly facade: ContainerFacade,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    public readonly settingService: SettingService
  ) {}

  viewImages() {
    this.imageViewer.open();
  }

  upload() {
    this.dialog.open(UploadDialogComponent, {
      width: '100%',
    });

    return this.facade.uploadImages();
  }

  capture() {
    return this.router.navigate(['/container', 'camera'], {
      queryParamsHandling: 'preserve',
    });
  }

  downloadToLocal() {
    this.facade.downloadImagesToLocal();
  }

  viewFtpImages() {
    this.facade.getFtpImages();
    this.dialog.open(FtpViewerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
    });
  }
}
