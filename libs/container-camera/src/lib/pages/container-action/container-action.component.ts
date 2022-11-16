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

  viewFtpImages() {}
}
