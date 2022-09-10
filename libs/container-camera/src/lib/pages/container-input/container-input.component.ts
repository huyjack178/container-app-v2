import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { isValid } from '../../utils';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContainerIdConfirmDialogComponent } from '../../components/container-id-confirm-dialog/container-id-confirm-dialog.component';

@Component({
  selector: 'container-management-container-input',
  templateUrl: './container-input.component.html',
  styleUrls: ['./container-input.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerInputComponent {
  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  openCamera(form: NgForm) {
    const containerId = form.value.containerId;

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
}
