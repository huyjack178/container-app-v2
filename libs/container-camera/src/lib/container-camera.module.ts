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
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContainerEffects, ContainerFacade, containerFeature } from './+state';
import { CameraComponent } from './components/camera/camera.component';
import { ContainerActionComponent } from './pages/container-action/container-action.component';
import { ContainerCameraComponent } from './pages/container-camera/container-camera.component';
import { ContainerInputComponent } from './pages/container-input/container-input.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { ContainerIdConfirmDialogComponent } from './components/container-id-confirm-dialog/container-id-confirm-dialog.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { MatDividerModule } from '@angular/material/divider';

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
        path: 'camera',
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
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(containerFeature),
    EffectsModule.forFeature([ContainerEffects]),
    GalleryModule,
    LightboxModule,
    MatDividerModule,
  ],
  declarations: [
    CameraComponent,
    ContainerCameraComponent,
    ContainerInputComponent,
    ContainerActionComponent,
    UploadDialogComponent,
    ContainerIdConfirmDialogComponent,
    ImageViewerComponent,
  ],
  exports: [ContainerCameraComponent, ContainerInputComponent],
  providers: [ContainerFacade],
})
export class ContainerCameraModule {}
