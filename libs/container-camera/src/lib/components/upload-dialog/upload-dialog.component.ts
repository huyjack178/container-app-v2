import { Component, OnInit } from '@angular/core';
import { ContainerFacade, ContainerImage } from '../../+state';
import { SettingService } from '@container-management/setting';

@Component({
  selector: 'container-management-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
})
export class UploadDialogComponent implements OnInit {
  readonly uploadSettings = this.settingService.getUploadSettings();

  constructor(
    readonly containerFacade: ContainerFacade,
    private readonly settingService: SettingService
  ) {}

  ngOnInit(): void {}

  calculateUploadedLocalCount(images: ContainerImage[]) {
    return images.filter((image) => image.isUploadedLocal).length;
  }

  calculateUploadedFtpCount(images: ContainerImage[]) {
    return images.filter((image) => image.isUploadedFtp).length;
  }

  calculateUploadedCloudCount(images: ContainerImage[]) {
    return images.filter((image) => image.isUploadedCloud).length;
  }

  closeDialog() {
    this.containerFacade.clearUploadStatus();
  }
}
