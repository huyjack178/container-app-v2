import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ContainerActions from './container.actions';
import * as ContainerFeature from './container.reducer';

@Injectable()
export class ContainerEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.initContainer),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ContainerActions.loadContainerSuccess({ container: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ContainerActions.loadContainerFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
