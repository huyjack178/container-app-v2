import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'container-management-container-id-confirm-dialog',
  templateUrl: './container-id-confirm-dialog.component.html',
  styleUrls: ['./container-id-confirm-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerIdConfirmDialogComponent implements OnInit {
  @Output() clickOk: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onOk() {
    this.clickOk.emit();
  }
}
