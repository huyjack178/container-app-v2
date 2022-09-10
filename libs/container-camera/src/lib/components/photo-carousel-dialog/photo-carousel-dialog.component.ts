import { Component, Inject, OnInit } from '@angular/core';
import { ContainerFacade } from '../../+state';

@Component({
  selector: 'container-management-photo-carousel-dialog',
  templateUrl: './photo-carousel-dialog.component.html',
  styleUrls: ['./photo-carousel-dialog.component.scss'],
})
export class PhotoCarouselDialogComponent implements OnInit {
  constructor(readonly facade: ContainerFacade) {}

  ngOnInit(): void {}

  deleteImage = (index: number) => this.facade.deleteImage(index);
}
