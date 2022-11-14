import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES,
} from 'jslib-html5-camera-photo';
import { BehaviorSubject, from } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'container-management-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraComponent implements AfterViewInit {
  @ViewChild('camera') cameraElement!: ElementRef;
  @Output() photoCaptured = new EventEmitter<string>();
  @Output() captureFinished = new EventEmitter<void>();
  readonly capturedPhoto$ = new BehaviorSubject<string | undefined>('');
  private cameraPhoto?: CameraPhoto;

  ngAfterViewInit() {
    this.startCameraVideo();
  }

  capturePhoto() {
    const audio = new Audio();
    audio.src = '/assets/camera-shutter.wav';
    audio.load();
    audio.play();

    const dataUri = this.cameraPhoto?.getDataUri({
      sizeFactor: 1,
      imageType: IMAGE_TYPES.JPG,
      imageCompression: 1,
    });

    this.capturedPhoto$.next(dataUri);
    this.photoCaptured.emit(dataUri);
  }

  finishCapturing() {
    this.captureFinished.emit();
  }

  private startCameraVideo() {
    this.cameraPhoto = new CameraPhoto(this.cameraElement.nativeElement);

    from(this.cameraPhoto.startCameraMaxResolution(FACING_MODES.ENVIRONMENT))
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (stream) => console.log(stream),
        error: (error) => {
          alert(error);
        },
        complete: () => console.info('complete'),
      });
  }
}
