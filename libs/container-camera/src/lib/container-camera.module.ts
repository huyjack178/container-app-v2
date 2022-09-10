import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContainerEffects, ContainerFacade, containerFeature } from './+state';
import { CameraComponent } from './components/camera/camera.component';
import { PhotoCarouselComponent } from './components/photo-carousel/photo-carousel.component';
import { ContainerActionComponent } from './pages/container-action/container-action.component';
import { ContainerCameraComponent } from './pages/container-camera/container-camera.component';
import { ContainerInputComponent } from './pages/container-input/container-input.component';
import { PhotoCarouselDialogComponent } from './components/photo-carousel-dialog/photo-carousel-dialog.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ContainerInputComponent,
      },
      {
        path: 'video',
        pathMatch: 'full',
        component: ContainerCameraComponent,
      },
      {
        path: 'action',
        pathMatch: 'full',
        component: ContainerActionComponent,
      },
    ]),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    IvyCarouselModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(containerFeature),
    EffectsModule.forFeature([ContainerEffects]),
  ],
  declarations: [
    CameraComponent,
    PhotoCarouselComponent,
    ContainerCameraComponent,
    ContainerInputComponent,
    ContainerActionComponent,
    PhotoCarouselDialogComponent,
    UploadDialogComponent,
  ],
  exports: [ContainerCameraComponent, ContainerInputComponent],
  providers: [ContainerFacade],
})
export class ContainerCameraModule {}
