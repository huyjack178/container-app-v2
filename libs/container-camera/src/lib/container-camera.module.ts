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
import {
  CameraComponent,
  ContainerIdConfirmDialogComponent,
  ImageViewerComponent,
  UploadDialogComponent,
} from './components';
import { ContainerActionComponent } from './pages/container-action/container-action.component';
import { ContainerCameraComponent } from './pages/container-camera/container-camera.component';
import { ContainerInputComponent } from './pages/container-input/container-input.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { MatDividerModule } from '@angular/material/divider';
import { FtpViewerComponent } from './components/ftp-viewer/ftp-viewer.component';
import { MatListModule } from '@angular/material/list';
import { FtpImageViewerComponent } from './components/ftp-image-viewer/ftp-image-viewer.component';
import { NativeCameraComponent } from './components/native-camera/native-camera.component';
import { ExternalLinkPopupComponent } from './components/external-link-popup/external-link-popup.component';
import { ContainerInputActionComponent } from './pages/container-input-action/container-input-action.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { ContainerActionPanelComponent } from './components/container-action-panel/container-action-panel.component';
import { PhotoGridComponent } from './components/photo-grid/photo-grid.component';
import { ImageViewerDialogComponent } from './components/image-viewer-dialog/image-viewer-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ContainerInputActionComponent,
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
    MatListModule,
    MatGridListModule,
    VirtualScrollerModule,
    MatSnackBarModule,
  ],
  declarations: [
    CameraComponent,
    ContainerCameraComponent,
    ContainerInputComponent,
    ContainerActionComponent,
    UploadDialogComponent,
    ContainerIdConfirmDialogComponent,
    ImageViewerComponent,
    FtpViewerComponent,
    FtpImageViewerComponent,
    NativeCameraComponent,
    ExternalLinkPopupComponent,
    ContainerInputActionComponent,
    ContainerActionPanelComponent,
    PhotoGridComponent,
    ImageViewerDialogComponent,
  ],
  exports: [],
  providers: [ContainerFacade, CookieService],
})
export class ContainerCameraModule {}
