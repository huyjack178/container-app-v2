import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ContainerActions from './container.actions';
import { ContainerEntity } from './container.models';

export const CONTAINER_FEATURE_KEY = 'container';

export interface ContainerState extends EntityState<ContainerEntity> {
  selectedId?: string | number; // which Container record has been selected
  loaded: boolean; // has the Container list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContainerPartialState {
  readonly [CONTAINER_FEATURE_KEY]: ContainerState;
}

export const containerAdapter: EntityAdapter<ContainerEntity> =
  createEntityAdapter<ContainerEntity>();

export const initialContainerState: ContainerState =
  containerAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialContainerState,
  on(ContainerActions.initContainer, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ContainerActions.loadContainerSuccess, (state, { container }) =>
    containerAdapter.setAll(container, { ...state, loaded: true })
  ),
  on(ContainerActions.loadContainerFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ContainerActions.selectContainerId, (state, { containerId }) => ({
    ...state,
    selectedId: containerId,
  }))
);

export function containerReducer(
  state: ContainerState | undefined,
  action: Action
) {
  return reducer(state, action);
}
