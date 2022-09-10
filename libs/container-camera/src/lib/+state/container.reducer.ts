import { createFeature, createReducer, on } from '@ngrx/store';
import * as ContainerActions from './container.actions';

export interface ContainerState {
  readonly loaded: boolean;
  readonly imageList: string[];
  readonly error: string | null;
}

export const initialContainerState: ContainerState = {
  loaded: true,
  imageList: [],
  error: null,
};

const reducer = createReducer(
  initialContainerState,
  on(ContainerActions.selectImageList, (state, { imageList }) => ({
    ...state,
    imageList,
  })),
  on(ContainerActions.deleteImage, (state, { index }) => {
    const newState = { ...state };
    newState.imageList.splice(index, 1);
    return newState;
  })
);

export const containerFeature = createFeature({
  name: 'container',
  reducer,
});
