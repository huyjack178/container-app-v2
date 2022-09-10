import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'angular-responsive-carousel/lib/interfaces';
import { ContainerFacade } from '../../+state';
import { first, take, tap, withLatestFrom } from 'rxjs';
import { PhotoCarouselDialogComponent } from '../../components/photo-carousel-dialog/photo-carousel-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  ngOnInit(): void {
    this.facade.selectContainerId$
      .pipe(first())
      .subscribe((containerId) => console.log(containerId));
  }

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
