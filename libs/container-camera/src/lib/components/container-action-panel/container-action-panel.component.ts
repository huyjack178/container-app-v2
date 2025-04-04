import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FtpViewerComponent } from '../ftp-viewer/ftp-viewer.component';
import { ContainerFacade } from '@container-management/container-camera';
import { MatDialog } from '@angular/material/dialog';
import { SettingService } from '@container-management/setting';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { process$ } from '../../utils/image-processor';
import { first } from 'rxjs';
import { ExternalLinkPopupComponent } from '../external-link-popup/external-link-popup.component';
import { ExternalUrls } from '../../services/external-urls.service';

@Component({
  selector: 'container-management-container-action-panel',
  templateUrl: './container-action-panel.component.html',
  styleUrls: ['./container-action-panel.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerActionPanelComponent implements OnInit {
  @ViewChild('fileSelector') fileSelector!: ElementRef<HTMLInputElement>;

  @Input() containerInputForm!: NgForm;

  @Output() capturePhoto: EventEmitter<boolean> = new EventEmitter();

  constructor(
    readonly containerFacade: ContainerFacade,
    readonly settingService: SettingService,
    private readonly dialog: MatDialog,
    @Inject('environment') private readonly environment: any
  ) {}

  ngOnInit(): void {
    this.containerFacade.getExternalUrls();
  }

  upload() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '100%',
    });

    dialogRef.componentInstance.keepCapture.subscribe(() => {
      this.capturePhoto.emit();
    });

    return this.containerFacade.uploadImages({ isForceUpload: true });
  }

  downloadToLocal() {
    this.containerFacade.downloadImagesToLocal();
  }

  viewUploadedImages() {
    if (this.settingService.getUploadSettings().ftp.enabled) {
      this.containerFacade.getFtpImagesWithContainerId();
    } else {
      this.containerFacade.getLocalImages();
    }

    this.dialog.open(FtpViewerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
    });
  }

  selectFiles() {
    this.fileSelector.nativeElement.click();
  }

  selectedFiles() {
    const containerId = this.containerInputForm.value.containerId;
    const opt = this.containerInputForm.value.opt;

    this.containerFacade.setContainerId({
      opt,
      containerId,
    });

    if (this.fileSelector?.nativeElement?.files) {
      const files = this.fileSelector.nativeElement.files;

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          const photoDataUri = reader.result;
          if (typeof photoDataUri === 'string') {
            process$(photoDataUri, this.settingService.getImageSettings())
              .pipe(first())
              .subscribe((processImage) => {
                this.containerFacade.addImage(
                  processImage,
                  this.containerInputForm.value.containerId
                );
              });
          }
        };
      }
    }
  }

  openRemarkPopup(url: string) {
    this.dialog.open(ExternalLinkPopupComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: {
        url,
      },
    });
  }

  getKeysOfExternalUrls(externalUrls: ExternalUrls): string[] {
    return Object.keys(externalUrls);
  }
}
