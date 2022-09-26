import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { defaultUploadSettings } from '../../constants';
import { UploadSettings } from '../../interfaces';
import { SettingService } from '../../services';

@Component({
  selector: 'container-management-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss'],
})
export class SettingDialogComponent implements OnInit {
  panelOpenState = true;
  public readonly uploadSettings$: BehaviorSubject<UploadSettings> =
    new BehaviorSubject<UploadSettings>(defaultUploadSettings);

  constructor(
    private readonly dialog: MatDialog,
    public readonly settingService: SettingService
  ) {}

  ngOnInit(): void {
    this.uploadSettings$.next(this.settingService.getUploadSettings());
  }

  onSubmit(settingForm: NgForm) {
    this.settingService.adjustUploadSettings(settingForm.value);
    this.dialog.closeAll();
  }
}
