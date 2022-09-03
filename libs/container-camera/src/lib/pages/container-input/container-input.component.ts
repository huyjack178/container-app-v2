import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerFacade } from '@container-management/container-camera';
import { tap } from 'rxjs';

@Component({
  selector: 'container-management-container-input',
  templateUrl: './container-input.component.html',
  styleUrls: ['./container-input.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerInputComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly containerFacade: ContainerFacade
  ) {}

  ngOnInit(): void {
    this.containerFacade.selectedContainer$.pipe(tap(console.log));
  }

  openCamera(containerId: HTMLInputElement) {
    this.containerFacade.selectContainerId(containerId.value);
    this.router.navigate([this.router.url, 'video'], {
      queryParams: {
        containerId: containerId.value,
      },
    });
  }
}
