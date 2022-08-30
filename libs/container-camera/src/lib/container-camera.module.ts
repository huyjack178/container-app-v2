import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CameraComponent } from './components/camera/camera.component';
import { PhotoCarouselComponent } from './components/photo-carousel/photo-carousel.component';
import { ContainerCameraComponent } from './pages/container-camera/container-camera.component';
import { ContainerInputComponent } from './pages/container-input/container-input.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ContainerInputComponent,
      },
    ]),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    IvyCarouselModule,
    MatInputModule,
    FormsModule,
  ],
  declarations: [
    CameraComponent,
    PhotoCarouselComponent,
    ContainerCameraComponent,
    ContainerInputComponent,
  ],
  exports: [ContainerCameraComponent, ContainerInputComponent],
})
export class ContainerCameraModule {}
