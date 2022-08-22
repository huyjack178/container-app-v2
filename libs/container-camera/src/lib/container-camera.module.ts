import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CameraComponent } from './components/camera/camera.component';
import { PhotoCarouselComponent } from './components/photo-carousel/photo-carousel.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
      },
    ]),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    IvyCarouselModule,
  ],
  declarations: [CameraComponent, DashboardComponent, PhotoCarouselComponent],
  exports: [CameraComponent, DashboardComponent],
})
export class ContainerCameraModule {}
