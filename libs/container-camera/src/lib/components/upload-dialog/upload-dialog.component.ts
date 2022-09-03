import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'container-management-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
})
export class UploadDialogComponent implements OnInit {
  panelOpenState = true;
  constructor() {}

  ngOnInit(): void {}
}
