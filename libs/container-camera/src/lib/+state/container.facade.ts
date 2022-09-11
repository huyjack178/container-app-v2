import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ContainerActions from './container.actions';
import * as ContainerSelectors from './container.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class ContainerFacade {
  readonly loaded$ = this.store.pipe(select(ContainerSelectors.selectLoaded));
  readonly selectImages$: Observable<string[]> = this.store.select(
    ContainerSelectors.selectImages
  );

  constructor(private readonly store: Store) {}

  setImages(images: string[]) {
    this.store.dispatch(ContainerActions.selectImages({ images }));
  }

  deleteImage(index: number) {
    this.store.dispatch(ContainerActions.deleteImage({ index }));
  }
}
