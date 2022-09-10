import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ContainerActions from './container.actions';
import * as ContainerSelectors from './container.selectors';
import * as RouterSelectors from './router.selectors';
import { map, Observable } from 'rxjs';
import { Image } from 'angular-responsive-carousel/lib/interfaces';

@Injectable()
export class ContainerFacade {
  loaded$ = this.store.pipe(select(ContainerSelectors.selectLoaded));
  selectContainerId$: Observable<string> = this.store
    .select(RouterSelectors.selectQueryParams)
    .pipe(map((params) => params['containerId']));
  selectImageList$: Observable<string[]> = this.store.select(
    ContainerSelectors.selectImageList
  );

  constructor(private readonly store: Store) {}

  setContainerId(containerId: string) {
    this.store.dispatch(ContainerActions.selectContainerId({ containerId }));
  }

  setImageList(imageList: string[]) {
    this.store.dispatch(ContainerActions.selectImageList({ imageList }));
  }

  deleteImage(index: number) {
    this.store.dispatch(ContainerActions.deleteImage({ index }));
  }
}
