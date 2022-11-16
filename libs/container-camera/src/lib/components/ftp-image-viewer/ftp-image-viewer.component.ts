import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ContainerFacade } from '@container-management/container-camera';

@Component({
  selector: 'container-management-ftp-image-viewer',
  templateUrl: './ftp-image-viewer.component.html',
  styleUrls: ['./ftp-image-viewer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtpImageViewerComponent implements OnInit {
  constructor(readonly containerFacade: ContainerFacade) {}

  ngOnInit(): void {}
}
