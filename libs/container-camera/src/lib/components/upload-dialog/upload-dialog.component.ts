import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContainerFacade, ContainerImage } from '../../+state';
import { SettingService } from '@container-management/setting';
import { Router } from '@angular/router';

@Component({
  selector: 'container-management-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
})
export class UploadDialogComponent implements OnInit {
  @Output() keepCapture = new EventEmitter();
  readonly uploadSettings = this.settingService.getUploadSettings();

  constructor(
    readonly containerFacade: ContainerFacade,
    private readonly router: Router,
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

  continueCapture() {
    this.containerFacade.clearImages();
    this.keepCapture.emit();
  }

  backToHomePage() {
    this.containerFacade.resetState();
    return this.router.navigate(['/container']);
  }
}
