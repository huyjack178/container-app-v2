import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContainerCameraModule } from '@container-management/container-camera';

@NgModule({
  imports: [
    AngularCommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    ContainerCameraModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class CommonModule {}
