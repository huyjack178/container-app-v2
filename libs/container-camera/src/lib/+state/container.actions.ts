import { createAction, props } from '@ngrx/store';

export const selectImages = createAction(
  '[Container] Images is set',
  props<{ images: string[] }>()
);

export const deleteImage = createAction(
  '[Container] Image is deleted',
  props<{ index: number }>()
);
