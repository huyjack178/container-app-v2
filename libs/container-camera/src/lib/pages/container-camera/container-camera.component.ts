import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerFacade } from '../../+state';
import { first } from 'rxjs';

@Component({
  selector: 'container-management-container-camera',
  templateUrl: './container-camera.component.html',
  styleUrls: ['./container-camera.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerCameraComponent implements OnInit {
  readonly images: string[] = [];

  constructor(
    private readonly router: Router,
    readonly facade: ContainerFacade
  ) {}

  ngOnInit(): void {}

  onPhotoCaptured(photoDataUri: string) {
    this.images.push(photoDataUri);
  }

  onCaptureFinished() {
    this.facade.setImageList(this.images);
    return this.router.navigate(['container', 'action'], {
      queryParamsHandling: 'preserve',
    });
  }
}
