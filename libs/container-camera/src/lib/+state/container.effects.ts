import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContainerActions from './container.actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { UploadImageService } from '../services/upload-image.service';
import { combineLatest, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ContainerSelectors from './container.selectors';
import * as RouterSelectors from './router.selectors';

@Injectable()
export class ContainerEffects {
  uploadContainerImages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ContainerActions.uploadImages),
        withLatestFrom(
          this.store$.select(ContainerSelectors.selectImages),
          this.store$.select(ContainerSelectors.selectDate),
          this.store$.select(RouterSelectors.selectQueryParam('containerId'))
        ),
        mergeMap(([action, images, date, containerId]) => {
          return images.map((image) => ({
            containerId: containerId ?? '',
            image: action.isHighResolution
              ? image.data.highResolution
              : image.data.lowResolution,
            imageFileDate: date,
            imageFileName: image.name,
            isHighResolution: action.isHighResolution,
            userName: action.userName,
          }));
        }),
        switchMap((uploadImage) => {
          return combineLatest([
            this.uploadService.uploadToLocalServer$(uploadImage),
            this.uploadService.uploadToFtpServer$(uploadImage),
            this.uploadService.uploadToCloud$(uploadImage),
          ]);
        }),
        catchError((error) => {
          throw new Error(error);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly uploadService: UploadImageService,
    private readonly store$: Store
  ) {}
}
