import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';

import * as ContainerActions from './container.actions';
import * as ContainerSelectors from './container.selectors';

@Injectable()
export class ContainerFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ContainerSelectors.getContainerLoaded));
  allContainer$ = this.store.pipe(select(ContainerSelectors.getAllContainer));
  selectedContainer$ = this.store.pipe(
    select(ContainerSelectors.getSelectedId)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ContainerActions.initContainer());
  }

  selectContainerId(containerId: string) {
    this.store.dispatch(ContainerActions.selectContainerId({ containerId }));
  }
}
