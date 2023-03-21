import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ContainerFacade } from '@container-management/container-camera';
import { MatDialog } from '@angular/material/dialog';
import { FtpImageViewerComponent } from '../ftp-image-viewer/ftp-image-viewer.component';
import { SettingService } from '@container-management/setting';

@Component({
  selector: 'container-management-ftp-viewer',
  templateUrl: './ftp-viewer.component.html',
  styleUrls: ['./ftp-viewer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtpViewerComponent {
  readonly images$ = this.containerFacade.uploadedImages$;

  constructor(
    private readonly containerFacade: ContainerFacade,
    private readonly dialog: MatDialog,
    readonly settingService: SettingService
  ) {}

  openImage(fileName: string) {
    if (this.settingService.getUploadSettings().ftp.enabled) {
      this.containerFacade.downloadFtpImage(fileName);
    } else {
      this.containerFacade.downloadLocalImage(fileName);
    }

    this.dialog.open(FtpImageViewerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
    });
  }
}
