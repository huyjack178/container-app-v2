import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'container-management-ftp-viewer',
  templateUrl: './ftp-viewer.component.html',
  styleUrls: ['./ftp-viewer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtpViewerComponent implements OnInit {
  imageFileNames: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
