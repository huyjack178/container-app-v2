import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ContainerFacade } from '@container-management/container-camera';
import { MatDialog } from '@angular/material/dialog';
import { FtpImageViewerComponent } from '../ftp-image-viewer/ftp-image-viewer.component';

@Component({
  selector: 'container-management-ftp-viewer',
  templateUrl: './ftp-viewer.component.html',
  styleUrls: ['./ftp-viewer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtpViewerComponent implements OnInit {
  readonly ftpImages$ = this.containerFacade.ftpImages$;

  constructor(
    private readonly containerFacade: ContainerFacade,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openFtpImage(fileName: string) {
    this.containerFacade.downloadFtpImage(fileName);
    this.dialog.open(FtpImageViewerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
    });
  }
}
