import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Image } from 'angular-responsive-carousel/lib/interfaces';

@Component({
  selector: 'container-management-photo-carousel',
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PhotoCarouselComponent implements OnInit {
  @Input() images!: Image[];

  constructor() {}

  ngOnInit(): void {}
}
