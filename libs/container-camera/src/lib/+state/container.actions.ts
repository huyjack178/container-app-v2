import { createAction, props } from '@ngrx/store';
import { ProcessedImage } from '../utils/image-processor';
import { ExternalUrls } from '../services/external-urls.service';

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

export const getUploadedPathSuccessfully = createAction(
  '[Container] Uploaded path is retrieved successfully',
  props<{
    path: string;
  }>()
);

export const getFtpImagesWithPath = createAction(
  '[Container] Ftp Images is retrieving with path'
);

export const getLocalImages = createAction(
  '[Container] Local Images is retrieving'
);

export const getFtpImagesWithContainerId = createAction(
  '[Container] Ftp Images is retrieving with container id'
);

export const downloadFtpImage = createAction(
  '[Container] Ftp Image is opening',
  props<{
    fileName: string;
  }>()
);

export const downloadLocalImage = createAction(
  '[Container] Local Image is opening',
  props<{
    fileName: string;
  }>()
);

export const setLoadingImage = createAction('[Container] Image is loading');

export const getUploadedImagesSuccessfully = createAction(
  '[Container] Uploaded Images is retrieved successfully',
  props<{
    images: string[];
    path?: string;
  }>()
);

export const getUploadedImageSuccessfully = createAction(
  '[Container] Uploaded Image is downloaded successfully',
  props<{
    uploadedImageSrc: string;
  }>()
);

export const clearImages = createAction('[Container] Images are cleared');

export const resetState = createAction('[Container] State is reset');

export const getExternalUrls = createAction(
  '[Container] External Urls are retrieving'
);

export const getExternalUrlsSuccessfully = createAction(
  '[Container] External Urls are retrieved',
  props<{
    externalUrls: ExternalUrls;
  }>()
);

export const setContainerId = createAction(
  '[Container] Container Id is set',
  props<{
    opt: string;
    containerId: string;
  }>()
);

export const loadOptFromStorage = createAction(
  '[Container] Load OPT from storage'
);
