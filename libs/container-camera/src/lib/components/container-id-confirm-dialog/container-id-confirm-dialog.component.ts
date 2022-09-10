import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ContainerIdConfirmDialogData {
  readonly containerId: string;
}

@Component({
  selector: 'container-management-container-id-confirm-dialog',
  templateUrl: './container-id-confirm-dialog.component.html',
  styleUrls: ['./container-id-confirm-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerIdConfirmDialogComponent implements OnInit {
  constructor(
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ContainerIdConfirmDialogData
  ) {}

  ngOnInit(): void {}

  onOk() {
    return this.router.navigate([this.router.url, 'camera'], {
      queryParams: {
        containerId: this.data.containerId,
      },
    });
  }
}
