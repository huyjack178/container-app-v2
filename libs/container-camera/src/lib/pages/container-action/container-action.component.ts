import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerFacade } from '../../+state';
import { ImageViewerComponent, UploadDialogComponent } from '../../components';
import { map, tap } from 'rxjs';
import { SettingService } from '@container-management/setting';
import { FtpViewerComponent } from '../../components/ftp-viewer/ftp-viewer.component';
import { NativeCameraComponent } from '../../components/native-camera/native-camera.component';
import { ExternalLinkPopupComponent } from '../../components/external-link-popup/external-link-popup.component';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'container-management-container-action',
  templateUrl: './container-action.component.html',
  styleUrls: ['./container-action.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerActionComponent {
  @ViewChild('imageViewer') imageViewer!: ImageViewerComponent;
  @ViewChild('nativeCameraComponent')
  nativeCameraComponent!: NativeCameraComponent;

  readonly hasNoImage$ = this.facade.selectImages$.pipe(
    map((images) => images.length === 0)
  );

  readonly ftpPath$ = this.facade.uploadedPath$;

  constructor(
    readonly facade: ContainerFacade,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    public readonly settingService: SettingService,
    private readonly activatedRoute: ActivatedRoute,
    @Inject('environment') private readonly environment: any
  ) {}

  viewImages() {
    this.imageViewer.open();
  }

  upload() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '100%',
    });

    dialogRef.componentInstance.keepCapture.subscribe(() => {
      this.capture();
    });

    return this.facade.uploadImages();
  }

  capture() {
    if (this.environment.useNativeCamera == 'yes') {
      return this.nativeCameraComponent.openCamera(
        this.activatedRoute.snapshot.queryParamMap.get('containerId') ?? ''
      );
    }

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

  openRemarkPopup() {
    this.dialog.open(ExternalLinkPopupComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: {
        urlName: 'remarkUrl',
      },
    });
  }

  openEstimatePopup() {
    this.dialog.open(ExternalLinkPopupComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: {
        urlName: 'estimateUrl',
      },
    });
  }
}
