import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ContainerActions from './container.actions';
import * as ContainerSelectors from './container.selectors';
import * as RouterSelectors from './router.selectors';
import { ProcessedImage } from '../utils/image-processor';
import { SettingService } from '@container-management/setting';
import { combineLatest, map, Observable } from 'rxjs';
import { ContainerImage } from './container.models';

@Injectable()
export class ContainerFacade {
  readonly loaded$ = this.store.pipe(select(ContainerSelectors.selectLoaded));
  readonly selectImages$: Observable<ContainerImage[]> = this.store.select(
    ContainerSelectors.selectImages
  );
  readonly selectContainerId$ = this.store.select(
    RouterSelectors.selectQueryParam('containerId')
  );

  readonly uploadedAllImagesToLocal$: Observable<boolean> = this.store
    .select(ContainerSelectors.selectImages)
    .pipe(map((images) => images.every((image) => image.isUploadedLocal)));

  readonly uploadedAllImagesToFtp$: Observable<boolean> = this.store
    .select(ContainerSelectors.selectImages)
    .pipe(map((images) => images.every((image) => image.isUploadedFtp)));

  readonly uploadedAllImagesToCloud$: Observable<boolean> = this.store
    .select(ContainerSelectors.selectImages)
    .pipe(map((images) => images.every((image) => image.isUploadedCloud)));

  readonly uploadedAllImages$: Observable<boolean> = combineLatest([
    this.uploadedAllImagesToLocal$,
    this.uploadedAllImagesToFtp$,
    this.uploadedAllImagesToCloud$,
  ]).pipe(map
    (([uploadAllToLocal, uploadAllToFtp, uploadAllToCloud]) =>
      uploadAllToCloud && uploadAllToLocal && uploadAllToFtp)
  );

  constructor(
    private readonly store: Store,
    private readonly settingService: SettingService
  ) {}

  addImage(processedImage: ProcessedImage, containerId: string) {
    this.store.dispatch(
      ContainerActions.addImage({ processedImage, containerId })
    );
  }

  deleteImage(index: number) {
    this.store.dispatch(ContainerActions.deleteImage({ index }));
  }

  uploadImages() {
    const uploadSettings = this.settingService.getUploadSettings();

    uploadSettings.local.enabled &&
      this.store.dispatch(
        ContainerActions.uploadImagesToLocal({
          isHighResolution: uploadSettings.local.enabledHigh,
        })
      );

    uploadSettings.ftp.enabled &&
      this.store.dispatch(
        ContainerActions.uploadImagesToFtp({ isHighResolution: false })
      );

    uploadSettings.cloudinary.enabled &&
      this.store.dispatch(
        ContainerActions.uploadImagesToCloud({ isHighResolution: false })
      );
  }

  clearUploadStatus() {
    this.store.dispatch(ContainerActions.clearUploadStatus());
  }
}
