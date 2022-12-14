import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Lightbox } from 'ng-gallery/lightbox';
import { ContainerFacade } from '../../+state';
import { Gallery, ImageItem, ImageSize } from 'ng-gallery';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'container-management-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('itemTemplate') lightBoxItemTemplate: any;

  currentIndex = 0;
  imagesLength = 0;

  constructor(
    private readonly facade: ContainerFacade,
    private readonly lightbox: Lightbox,
    private readonly gallery: Gallery
  ) {}

  ngOnInit(): void {
    this.facade.selectImages$.pipe(untilDestroyed(this)).subscribe((images) => {
      this.imagesLength = images.length;
      const imageItems = images.map(
        (image) => new ImageItem({ src: image.data.uri })
      );

      imageItems.length > 0
        ? this.getLightBoxRef().load(imageItems)
        : this.lightbox?.close();
    });
  }

  ngAfterViewInit(): void {
    const lightboxRef = this.getLightBoxRef();
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumb: false,
      loop: false,
      itemTemplate: this.lightBoxItemTemplate,
    });

    lightboxRef.indexChanged
      .pipe(untilDestroyed(this))
      .subscribe((state) => (this.currentIndex = state.currIndex ?? 0));
  }

  open() {
    this.lightbox.open(0, 'lightbox');
  }

  deleteImage = (index: number) => {
    this.facade.deleteImage(index);
    if (index > 0) this.getLightBoxRef().set(index - 1);
  };

  private getLightBoxRef = () => this.gallery.ref('lightbox');
}
