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

export const uploadImagesToLocal = createAction(
  '[Container] Images are uploading to local server',
  props<{
    isHighResolution: boolean;
  }>()
);

export const uploadImagesToLocalSuccessfully = createAction(
  '[Container] Images are uploaded to local server successfully',
  props<{
    imageName: string;
  }>()
);

export const uploadImagesToFtp = createAction(
  '[Container] Images are uploading to ftp server',
  props<{
    isHighResolution: boolean;
  }>()
);

export const uploadImagesToFtpSuccessfully = createAction(
  '[Container] Images are uploaded to ftp server successfully',
  props<{
    imageName: string;
  }>()
);

export const uploadImagesToCloud = createAction(
  '[Container] Images are uploading to cloud',
  props<{
    isHighResolution: boolean;
  }>()
);

export const uploadImagesToCloudSuccessfully = createAction(
  '[Container] Images are uploaded to cloud successfully',
  props<{
    imageName: string;
  }>()
);

export const clearUploadStatus = createAction(
  '[Container] Images uploaded status are cleared'
);
