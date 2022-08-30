import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Image } from 'angular-responsive-carousel/lib/interfaces';

@Component({
  selector: 'container-management-container-camera',
  templateUrl: './container-camera.component.html',
  styleUrls: ['./container-camera.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerCameraComponent implements OnInit {
  readonly images: Image[] = [];

  constructor() {}

  ngOnInit(): void {}

  onPhotoCaptured(photoDataUri: string) {
    this.images.push({
      path: photoDataUri,
    });
  }
}
