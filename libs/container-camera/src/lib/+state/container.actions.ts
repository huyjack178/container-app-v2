import { createAction, props } from '@ngrx/store';
import { ProcessedImage } from '../utils/image-processor';

export const deleteImage = createAction(
  '[Container] Image is deleted',
  props<{ index: number }>()
);

export const addImage = createAction(
  '[Container] Image is added',
  props<{ processedImage: ProcessedImage; containerId: string }>()
);
