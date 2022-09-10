import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerFacade } from '../../+state';

@Component({
  selector: 'container-management-container-input',
  templateUrl: './container-input.component.html',
  styleUrls: ['./container-input.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerInputComponent {
  constructor(
    private readonly router: Router,
    private readonly containerFacade: ContainerFacade
  ) {}

  openCamera(containerId: HTMLInputElement) {
    this.containerFacade.setContainerId(containerId.value);
    return this.router.navigate([this.router.url, 'video'], {
      queryParams: {
        containerId: containerId.value,
      },
    });
  }
}
