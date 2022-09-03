import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES,
} from 'jslib-html5-camera-photo';
import { BehaviorSubject, from, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'container-management-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('camera') cameraElement!: ElementRef;
  @Output() photoCaptured = new EventEmitter<string>();
  @Output() captureFinished = new EventEmitter<void>();
  readonly capturedPhoto$ = new BehaviorSubject<string | undefined>('');
  private readonly unsubscribe$ = new Subject<void>();
  private readonly windowResize$ = new Subject<void>();
  private cameraPhoto?: CameraPhoto;
  private screenWidth: any;
  private screenHeight: any;

  constructor() {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 64;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowResize$.next();
    this.windowResize$.complete();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.startCameraVideo();
  }

  ngAfterViewInit() {
    this.startCameraVideo();
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private startCameraVideo() {
    this.cameraPhoto = new CameraPhoto(this.cameraElement.nativeElement);

    from(
      this.cameraPhoto.startCamera(FACING_MODES.ENVIRONMENT, {
        width: this.screenWidth,
        height: this.screenHeight * 0.9,
      })
    )
      .pipe(takeUntil(this.unsubscribe$), takeUntil(this.windowResize$))
      .subscribe({
        next: (stream) => console.log(stream),
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }
}
