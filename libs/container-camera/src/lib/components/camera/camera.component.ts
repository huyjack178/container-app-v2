import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES,
} from 'jslib-html5-camera-photo';
import { from } from 'rxjs';

@Component({
  selector: 'container-management-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraComponent implements AfterViewInit {
  @ViewChild('camera') cameraElement!: ElementRef;

  private cameraPhoto?: CameraPhoto;

  constructor() {}

  ngAfterViewInit(): void {
    this.cameraPhoto = new CameraPhoto(this.cameraElement.nativeElement);

    from(
      this.cameraPhoto.startCamera(FACING_MODES.ENVIRONMENT, {
        width: 300, // TODO: Get device width height for more responsive
        height: 200,
      })
    ).subscribe({
      next: (stream) => console.log(stream),
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  capturePhoto() {
    const dataUri = this.cameraPhoto?.getDataUri({
      sizeFactor: 1,
      imageType: IMAGE_TYPES.JPG,
      imageCompression: 1,
    });

    console.log(dataUri);
  }
}
