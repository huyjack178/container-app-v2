import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Lightbox } from 'ng-gallery/lightbox';
import { ContainerFacade } from '../../+state';
import { Gallery, GalleryItem, ImageItem, ImageSize } from 'ng-gallery';
import { tap } from 'rxjs';

@Component({
  selector: 'container-management-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('itemTemplate') itemTemplate: any;
  items: GalleryItem[] = [];
  currentIndex = 0;
  constructor(
    private readonly facade: ContainerFacade,
    private readonly lightbox: Lightbox,
    private readonly gallery: Gallery,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.facade.selectImageList$.subscribe((imageList) => {
      this.items = imageList
        ? imageList.map((image) => new ImageItem({ src: image, thumb: image }))
        : [];
      this.gallery.ref('lightbox').load(this.items);
    });
  }

  open() {
    this.lightbox.open(0, 'lightbox');
  }

  deleteImage = (index: number) => {
    this.facade.deleteImage(index);
  };

  ngAfterViewInit(): void {
    const lightboxRef = this.gallery.ref('lightbox');
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumb: false,
      itemTemplate: this.itemTemplate,
    });

    lightboxRef.load(this.items);
    lightboxRef.indexChanged.subscribe(
      (state) => (this.currentIndex = state.currIndex ?? 0)
    );
  }
}
