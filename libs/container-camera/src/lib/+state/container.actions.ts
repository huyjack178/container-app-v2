import { createAction, props } from '@ngrx/store';

export const selectContainerId = createAction(
  '[Container/API] Container Id Selected',
  props<{ containerId: string }>()
);
