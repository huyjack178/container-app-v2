import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Image } from 'angular-responsive-carousel/lib/interfaces';

@Component({
  selector: 'container-management-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  readonly images: Image[] = [];

  constructor() {}

  ngOnInit(): void {}

  onPhotoCaptured(photoDataUri: string) {
    this.images.push({
      path: photoDataUri,
    });
  }
}
