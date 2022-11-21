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

export const downloadToLocal = createAction(
  '[Container] Images are downloaded to local storage'
);

export const getFtpPath = createAction('[Container] Ftp path is retrieving');

export const getFtpPathSuccessfully = createAction(
  '[Container] Ftp path is retrieved successfully',
  props<{
    ftpPath: string;
  }>()
);

export const getFtpImages = createAction(
  '[Container] Ftp Images is retrieving'
);

export const getFtpImagesWithContainerId = createAction(
  '[Container] Ftp Images is retrieving with path',
  props<{
    containerId: string;
  }>()
);

export const getFtpImagesSuccessfully = createAction(
  '[Container] Ftp Images is retrieved successfully',
  props<{
    ftpImages: string[];
    ftpPath?: string;
  }>()
);

export const downloadFtpImage = createAction(
  '[Container] Ftp Image is opening',
  props<{
    fileName: string;
  }>()
);

export const setLoadingFtpImage = createAction(
  '[Container] Ftp Image is loading'
);

export const downloadFtpImageSuccessfully = createAction(
  '[Container] Ftp Image is downloaded successfully',
  props<{
    ftpImageSrc: string;
  }>()
);

export const clearImages = createAction('[Container] Images are cleared');

export const resetState = createAction('[Container] State is reset');
