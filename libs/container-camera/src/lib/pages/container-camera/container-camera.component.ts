import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerFacade } from '../../+state';
import { process$ } from '../../utils/image-processor';
import { ImageSettings, SettingService } from '@container-management/setting';
import { first } from 'rxjs';

@Component({
  selector: 'container-management-container-camera',
  templateUrl: './container-camera.component.html',
  styleUrls: ['./container-camera.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerCameraComponent implements OnInit {
  #containerId?: string;
  readonly #imageSettings: ImageSettings;
  readonly images: string[] = [];

  constructor(
    readonly facade: ContainerFacade,
    private readonly router: Router,
    settingsService: SettingService
  ) {
    this.#imageSettings = settingsService.getImageSettings();
  }

  ngOnInit(): void {
    this.facade.selectContainerId$.subscribe((containerId) => {
      this.#containerId = containerId;
    });
  }

  onPhotoCaptured(photoDataUri: string) {
    this.images.push(photoDataUri);
    process$(photoDataUri, this.#imageSettings)
      .pipe(first())
      .subscribe((processImage) => {
        this.facade.addImage(processImage, this.#containerId ?? '');
      });
  }

  onCaptureFinished() {
    this.router.navigate(['container', 'action'], {
      queryParamsHandling: 'preserve',
    });
  }
}
