import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ContainerActions from './container.actions';
import * as ContainerSelectors from './container.selectors';
import * as RouterSelectors from './router.selectors';
import { map, Observable } from 'rxjs';

@Injectable()
export class ContainerFacade {
  loaded$ = this.store.pipe(select(ContainerSelectors.selectLoaded));
  selectContainerId$: Observable<string> = this.store
    .select(RouterSelectors.selectQueryParams)
    .pipe(map((params) => params['containerId']));

  constructor(private readonly store: Store) {}

  setContainerId(containerId: string) {
    this.store.dispatch(ContainerActions.selectContainerId({ containerId }));
  }
}
