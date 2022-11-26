import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { isValid } from '../../utils';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContainerIdConfirmDialogComponent } from '../../components';
import { SettingService } from '@container-management/setting';
import { FtpViewerComponent } from '../../components/ftp-viewer/ftp-viewer.component';
import { ContainerFacade } from '@container-management/container-camera';
import { process$ } from '../../utils/image-processor';
import { first } from 'rxjs';
import { NativeCameraComponent } from '../../components/native-camera/native-camera.component';

@Component({
  selector: 'container-management-container-input',
  templateUrl: './container-input.component.html',
  styleUrls: ['./container-input.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerInputComponent {
  @ViewChild('nativeCameraComponent')
  nativeCameraComponent!: NativeCameraComponent;
  containerId: string = '';

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    readonly settingService: SettingService,
    readonly containerFacade: ContainerFacade,
    @Inject('environment') private readonly environment: any
  ) {}

  openCamera(form: NgForm) {
    const containerId = form.value.containerId;

    if (!this.environment.useNativeCamera) {
      if (!isValid(containerId)) {
        this.dialog.open(ContainerIdConfirmDialogComponent, {
          width: '250px',
          data: { containerId },
        });

        return;
      }

      return this.router.navigate([this.router.url, 'camera'], {
        queryParams: {
          containerId,
        },
      });
    }

    return this.nativeCameraComponent.openCamera(containerId);
  }

  viewFtpImages(form: NgForm) {
    this.containerFacade.getFtpImagesWithContainerId(form.value.containerId);
    this.dialog.open(FtpViewerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
    });
  }
}
