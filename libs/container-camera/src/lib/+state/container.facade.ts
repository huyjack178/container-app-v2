import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ContainerActions from './container.actions';
import * as ContainerSelectors from './container.selectors';

@Injectable()
export class ContainerFacade {
  loaded$ = this.store.pipe(select(ContainerSelectors.selectLoaded));
  selectedContainer$ = this.store.select(ContainerSelectors.selectContainerId);

  constructor(private readonly store: Store) {}

  setContainerId(containerId: string) {
    this.store.dispatch(ContainerActions.selectContainerId({ containerId }));
  }
}
