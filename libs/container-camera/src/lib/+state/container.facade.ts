import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ContainerActions from './container.actions';
import * as ContainerSelectors from './container.selectors';
import * as RouterSelectors from './router.selectors';
import { ProcessedImage } from '../utils/image-processor';

@Injectable()
export class ContainerFacade {
  readonly loaded$ = this.store.pipe(select(ContainerSelectors.selectLoaded));
  readonly selectImages$ = this.store.select(ContainerSelectors.selectImages);
  readonly selectContainerId$ = this.store.select(
    RouterSelectors.selectQueryParam('containerId')
  );

  constructor(private readonly store: Store) {}

  addImage(processedImage: ProcessedImage, containerId: string) {
    this.store.dispatch(
      ContainerActions.addImage({ processedImage, containerId })
    );
  }

  deleteImage(index: number) {
    this.store.dispatch(ContainerActions.deleteImage({ index }));
  }
}
