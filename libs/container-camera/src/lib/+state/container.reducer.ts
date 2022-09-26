import { createFeature, createReducer, on } from '@ngrx/store';
import * as ContainerActions from './container.actions';
import { ContainerImage } from './container.models';
import * as moment from 'moment';

export interface ContainerState {
  readonly loaded: boolean;
  readonly date: moment.Moment;
  readonly images: ContainerImage[];
  readonly error: string | null;
}

const initialContainerState: ContainerState = {
  loaded: true,
  date: moment(),
  images: [],
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
      '0' + images.length
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
      images,
    };
  })
);

export const containerFeature = createFeature({
  name: 'container',
  reducer,
});
