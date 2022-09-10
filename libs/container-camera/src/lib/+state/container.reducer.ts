import { createFeature, createReducer, on } from '@ngrx/store';
import * as ContainerActions from './container.actions';

export interface ContainerState {
  readonly containerId: string | number;
  readonly loaded: boolean;
  readonly error: string | null;
}

export const initialContainerState: ContainerState = {
  containerId: '',
  loaded: true,
  error: null,
};

const reducer = createReducer(
  initialContainerState,
  on(ContainerActions.selectContainerId, (state, { containerId }) => ({
    ...state,
    containerId,
  }))
);

export const containerFeature = createFeature({
  name: 'container',
  reducer,
});
