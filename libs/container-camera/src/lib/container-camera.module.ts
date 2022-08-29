import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CameraComponent } from './components/camera/camera.component';
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
  ],
  declarations: [CameraComponent, DashboardComponent],
  exports: [CameraComponent, DashboardComponent],
})
export class ContainerCameraModule {}
