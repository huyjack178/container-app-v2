import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES,
} from 'jslib-html5-camera-photo';
import { BehaviorSubject, from } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ContainerFacade } from '../../+state/container.facade';

@UntilDestroy()
@Component({
  selector: 'container-management-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraComponent implements AfterViewInit, OnDestroy {
  @ViewChild('camera') readonly cameraElement!: ElementRef;
  @Output() readonly photoCaptured = new EventEmitter<string>();
  @Output() readonly captureFinished = new EventEmitter<void>();

  readonly capturedPhoto$ = new BehaviorSubject<string | undefined>('');
  private cameraPhoto?: CameraPhoto;

  ngAfterViewInit() {
    this.startCameraVideo();
  }

  ngOnDestroy(): void {
    this.cameraPhoto?.stopCamera();
  }

  capturePhoto() {
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
