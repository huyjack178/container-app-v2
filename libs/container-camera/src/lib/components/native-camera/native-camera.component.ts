import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { process$ } from '../../utils/image-processor';
import { first } from 'rxjs';
import { SettingService } from '@container-management/setting';
import { ContainerFacade } from '@container-management/container-camera';
import { Router } from '@angular/router';

@Component({
  selector: 'container-management-native-camera',
  templateUrl: './native-camera.component.html',
  styleUrls: ['./native-camera.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeCameraComponent implements OnInit {
  @ViewChild('nativeCamera') nativeCamera!: ElementRef<HTMLInputElement>;
  containerId!: string;

  constructor(
    readonly settingService: SettingService,
    readonly containerFacade: ContainerFacade,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  openCamera(containerId: string) {
    this.nativeCamera.nativeElement.click();
    this.containerId = containerId;
  }

  onCapture() {
    if (this.nativeCamera?.nativeElement?.files) {
      const file = this.nativeCamera.nativeElement.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const photoDataUri = reader.result;
        if (typeof photoDataUri === 'string') {
          process$(photoDataUri, this.settingService.getImageSettings())
            .pipe(first())
            .subscribe((processImage) => {
              this.containerFacade.addImage(processImage, this.containerId);
            });

          this.router.navigate(['container', 'action'], {
            queryParams: {
              containerId: this.containerId,
            },
          });
        }
      };
    }
  }
}
