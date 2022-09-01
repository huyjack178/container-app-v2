import { createAction, props } from '@ngrx/store';
import { ContainerEntity } from './container.models';

export const initContainer = createAction('[Container Page] Init');

export const loadContainerSuccess = createAction(
  '[Container/API] Load Container Success',
  props<{ container: ContainerEntity[] }>()
);

export const loadContainerFailure = createAction(
  '[Container/API] Load Container Failure',
  props<{ error: any }>()
);

export const selectContainerId = createAction(
  '[Container/API] Container Id Selected',
  props<{ containerId: string }>()
);
