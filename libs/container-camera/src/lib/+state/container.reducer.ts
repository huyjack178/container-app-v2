import { createFeature, createReducer, on } from '@ngrx/store';
import * as ContainerActions from './container.actions';

export interface ContainerState {
  readonly loaded: boolean;
  readonly images: string[];
  readonly error: string | null;
}

const initialContainerState: ContainerState = {
  loaded: true,
  images: [],
  error: null,
};

const reducer = createReducer(
  initialContainerState,
  on(ContainerActions.selectImages, (state, { images }) => ({
    ...state,
    images,
  })),
  on(ContainerActions.deleteImage, (state, { index }) => {
    const images = [...state.images];
    images.splice(index, 1);
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
