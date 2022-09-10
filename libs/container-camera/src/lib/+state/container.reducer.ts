import { createFeature, createReducer, on } from '@ngrx/store';
import * as ContainerActions from './container.actions';

export interface ContainerState {
  readonly loaded: boolean;
  readonly error: string | null;
}

export const initialContainerState: ContainerState = {
  loaded: true,
  error: null,
};

const reducer = createReducer(
  initialContainerState,
  on(ContainerActions.selectContainerId, (state, { containerId }) => ({
    ...state,
  }))
);

export const containerFeature = createFeature({
  name: 'container',
  reducer,
});
