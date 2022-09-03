import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTAINER_FEATURE_KEY,
  ContainerState,
  containerAdapter,
} from './container.reducer';

// Lookup the 'Container' feature state managed by NgRx
export const getContainerState = createFeatureSelector<ContainerState>(
  CONTAINER_FEATURE_KEY
);

const { selectAll, selectEntities } = containerAdapter.getSelectors();

export const getContainerLoaded = createSelector(
  getContainerState,
  (state: ContainerState) => state.loaded
);

export const getContainerError = createSelector(
  getContainerState,
  (state: ContainerState) => state.error
);

export const getAllContainer = createSelector(
  getContainerState,
  (state: ContainerState) => selectAll(state)
);

export const getContainerEntities = createSelector(
  getContainerState,
  (state: ContainerState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getContainerState,
  (state: ContainerState) => state.selectedId
);

export const getSelected = createSelector(
  getContainerEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
