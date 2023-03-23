import { createFeature, createReducer, on } from '@ngrx/store';
import * as ContainerActions from './container.actions';
import { ContainerImage } from './container.models';
import * as moment from 'moment';
import { ExternalUrls } from '../services/external-urls.service';

export interface ContainerState {
  readonly containerId: string;
  readonly loaded: boolean;
  readonly date: moment.Moment;
  readonly images: ContainerImage[];
  readonly imageCount: number;
  readonly uploadedPath: string;
  readonly uploadedImages: string[];
  readonly uploadedImageSrc: string;
  readonly externalUrls: ExternalUrls;
  readonly error: string | null;
}

const initialContainerState: ContainerState = {
  containerId: '',
  loaded: true,
  date: moment(),
  images: [],
  imageCount: 0,
  uploadedPath: '',
  uploadedImages: [],
  uploadedImageSrc: '',
  externalUrls: {
    remarkUrl1: {
      title: 'Remark 1',
      url: 'https://wikipedia.org/wiki/Main_Page',
    },
    remarkUrl2: {
      title: 'Remark 1',
      url: 'https://wikipedia.org/wiki/Main_Page',
    },
    remarkUrl3: {
      title: 'Remark 1',
      url: 'https://wikipedia.org/wiki/Main_Page',
    },
    remarkUrl4: {
      title: 'Remark 1',
      url: 'https://wikipedia.org/wiki/Main_Page',
    },
  },
  error: null,
};

const reducer = createReducer(
  initialContainerState,
  on(ContainerActions.deleteImage, (state, { index }) => {
    const images = [...state.images];
    images.splice(index, 1);
    return {
      ...state,
      images,
    };
  }),
  on(ContainerActions.addImage, (state, { processedImage, containerId }) => {
    const images = [...state.images];
    const imageName = `${containerId}_${state.date.format('YYMMDDHHmmss')}_${(
      '0' + state.imageCount
    ).slice(-2)}`;
    const image: ContainerImage = {
      name: imageName,
      data: {
        uri: processedImage.uri,
        lowResolution: processedImage.lowResolution,
        highResolution: processedImage.highResolution,
      },
    };

    images.push(image);

    return {
      ...state,
      imageCount: state.imageCount + 1,
      images,
    };
  }),
  on(
    ContainerActions.uploadImagesToLocalSuccessfully,
    (state, { imageName }) => {
      const updatedImages = state.images.map((image) =>
        image.name === imageName ? { ...image, isUploadedLocal: true } : image
      );

      return {
        ...state,
        images: updatedImages,
      };
    }
  ),
  on(ContainerActions.uploadImagesToFtpSuccessfully, (state, { imageName }) => {
    const updatedImages = state.images.map((image) =>
      image.name === imageName ? { ...image, isUploadedFtp: true } : image
    );

    return {
      ...state,
      images: updatedImages,
    };
  }),
  on(
    ContainerActions.uploadImagesToCloudSuccessfully,
    (state, { imageName }) => {
      const updatedImages = state.images.map((image) =>
        image.name === imageName ? { ...image, isUploadedCloud: true } : image
      );

      return {
        ...state,
        images: updatedImages,
      };
    }
  ),
  on(ContainerActions.clearUploadStatus, (state) => {
    const updatedImages = state.images.map((image) => ({
      ...image,
      isUploadedLocal: false,
      isUploadedFtp: false,
      isUploadedCloud: false,
    }));

    return {
      ...state,
      images: updatedImages,
    };
  }),
  on(ContainerActions.clearImages, (state) => {
    return {
      ...state,
      images: [],
      imageCount: 0,
      date: moment(),
    };
  }),
  on(ContainerActions.resetState, () => ({
    ...initialContainerState,
    date: moment(),
  })),
  on(ContainerActions.getUploadedPathSuccessfully, (state, { path }) => ({
    ...state,
    uploadedPath: path,
    uploadedImages: [],
  })),
  on(
    ContainerActions.getUploadedImagesSuccessfully,
    (state, { images, path }) => ({
      ...state,
      uploadedImages: images,
      uploadedPath: path ?? state.uploadedPath,
    })
  ),
  on(
    ContainerActions.getUploadedImageSuccessfully,
    (state, { uploadedImageSrc }) => ({
      ...state,
      uploadedImageSrc,
    })
  ),
  on(ContainerActions.setLoadingImage, (state, {}) => ({
    ...state,
    uploadedImageSrc:
      'https://media.tenor.com/guhB4PpjrmUAAAAM/loading-loading-gif.gif',
  })),
  on(
    ContainerActions.getExternalUrlsSuccessfully,
    (state, { externalUrls }) => ({
      ...state,
      externalUrls,
    })
  ),
  on(ContainerActions.setContainerId, (state, { containerId }) => ({
    ...state,
    containerId,
  }))
);

export const containerFeature = createFeature({
  name: 'container',
  reducer,
});
