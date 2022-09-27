import { createAction, props } from '@ngrx/store';
import { ProcessedImage } from '../utils/image-processor';
import { UploadImagePayload } from '../services/upload-image.service';

export const deleteImage = createAction(
  '[Container] Image is deleted',
  props<{ index: number }>()
);

export const addImage = createAction(
  '[Container] Image is added',
  props<{ processedImage: ProcessedImage; containerId: string }>()
);

export const uploadImages = createAction(
  '[Container] Images are uploading',
  props<{
    userName: string;
    isHighResolution: boolean;
  }>()
);

export const uploadImage = createAction(
  '[Container] Images are uploading',
  props<{
    payload: UploadImagePayload;
  }>()
);
