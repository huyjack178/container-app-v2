import { createAction, props } from '@ngrx/store';
import { Image } from 'angular-responsive-carousel/lib/interfaces';

export const selectContainerId = createAction(
  '[Container/API] Container Id Selected',
  props<{ containerId: string }>()
);

export const selectImageList = createAction(
  '[Container/API] Image List Set',
  props<{ imageList: string[] }>()
);

export const deleteImage = createAction(
  '[Container/API] Image Deleted',
  props<{ index: number }>()
);
