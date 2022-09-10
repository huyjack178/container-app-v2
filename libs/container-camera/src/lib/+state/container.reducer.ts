import { createFeature, createReducer, on } from '@ngrx/store';
import * as ContainerActions from './container.actions';

export interface ContainerState {
  readonly loaded: boolean;
  imageList: string[];
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
    const imageList = [...state.imageList];
    imageList.splice(index, 1);
    return {
      ...state,
      imageList,
    };
  })
);

export const containerFeature = createFeature({
  name: 'container',
  reducer,
});
