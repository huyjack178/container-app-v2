import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'container-management-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraComponent {}
