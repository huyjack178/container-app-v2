import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerFacade } from '@container-management/container-camera';
import { Image } from 'angular-responsive-carousel/lib/interfaces';
import { tap } from 'rxjs';

@Component({
  selector: 'container-management-container-camera',
  templateUrl: './container-camera.component.html',
  styleUrls: ['./container-camera.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerCameraComponent implements OnInit {
  readonly images: Image[] = [];

  constructor(
    private readonly router: Router,
    private readonly facade: ContainerFacade
  ) {}

  ngOnInit(): void {}

  onPhotoCaptured(photoDataUri: string) {
    this.images.push({
      path: photoDataUri,
    });
  }

  onCaptureFinished() {
    this.router.navigate(['container', 'action'], {});
  }
}
