import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContainerActions from './container.actions';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import {
  UploadImagePayload,
  UploadImageService,
} from '../services/upload-image.service';
import { map, Observable, pipe, UnaryFunction, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ContainerSelectors from './container.selectors';
import * as RouterSelectors from './router.selectors';
import { SettingService } from '@container-management/setting';

@Injectable()
export class ContainerEffects {
  uploadContainerImagesToLocal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.uploadImagesToLocal),
      map((action) => action.isHighResolution),
      mapUploadImages(this.store$, this.settingService.getUserName()),
      mergeMap((uploadImage) =>
        this.uploadService.uploadToLocalServer$(uploadImage).pipe(
          map(() =>
            ContainerActions.uploadImagesToLocalSuccessfully({
              imageName: uploadImage.imageFileName,
            })
          )
        )
      ),
      catchError((error) => {
        console.log(error);
        throw new Error(error);
      })
    )
  );

  uploadContainerImagesToFtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.uploadImagesToFtp),
      map((action) => action.isHighResolution),
      mapUploadImages(this.store$, this.settingService.getUserName()),
      mergeMap((uploadImage) =>
        this.uploadService.uploadToFtpServer$(uploadImage).pipe(
          map(() =>
            ContainerActions.uploadImagesToFtpSuccessfully({
              imageName: uploadImage.imageFileName,
            })
          )
        )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  uploadContainerImagesToCloud$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.uploadImagesToCloud),
      map((action) => action.isHighResolution),
      mapUploadImages(this.store$, this.settingService.getUserName()),
      mergeMap((uploadImage) =>
        this.uploadService.uploadToCloud$(uploadImage).pipe(
          map(() =>
            ContainerActions.uploadImagesToCloudSuccessfully({
              imageName: uploadImage.imageFileName,
            })
          )
        )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  downloadImagesToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ContainerActions.downloadToLocal),
        withLatestFrom(
          this.store$.select(ContainerSelectors.selectImages),
          this.store$.select(ContainerSelectors.selectDate),
          this.store$.select(RouterSelectors.selectContainerId)
        ),
        mergeMap(([a, images, date, containerId]) =>
          this.uploadService.downloadToLocalStorage(
            containerId ?? '',
            images,
            date
          )
        ),
        catchError((error) => {
          throw new Error(error);
        })
      ),
    {
      dispatch: false,
    }
  );

  getFtpFolderPath$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.getFtpPath),
      withLatestFrom(
        this.store$.select(ContainerSelectors.selectDate),
        this.store$.select(RouterSelectors.selectContainerId)
      ),
      mergeMap(([a, date, containerId]) =>
        this.uploadService
          .getFtpPath$(
            containerId ?? '',
            date,
            this.settingService.getUserName()
          )
          .pipe(
            map((response) =>
              ContainerActions.getFtpPathSuccessfully({
                ftpPath: response.folderPath,
              })
            )
          )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  getImagesFromFtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.getFtpImages),
      withLatestFrom(this.store$.select(ContainerSelectors.selectFtpPath)),
      mergeMap(([a, ftpPath]) =>
        this.uploadService
          .getFtpImages$(ftpPath)
          .pipe(
            map((ftpImages) =>
              ContainerActions.getFtpImagesSuccessfully({ ftpImages })
            )
          )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  downloadFtpImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.downloadFtpImage),
      withLatestFrom(this.store$.select(ContainerSelectors.selectFtpPath)),
      mergeMap(([action, ftpPath]) =>
        this.uploadService
          .downloadFtpImage$(ftpPath + action.fileName)
          .pipe(
            map((ftpImage) =>
              ContainerActions.downloadFtpImageSuccessfully({
                ftpImageSrc: ftpImage.src,
              })
            )
          )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly uploadService: UploadImageService,
    private readonly settingService: SettingService,
    private readonly store$: Store
  ) {}
}

const mapUploadImages = (
  store$: Store,
  userName: string
): UnaryFunction<Observable<boolean>, Observable<UploadImagePayload>> =>
  pipe(
    withLatestFrom(
      store$.select(ContainerSelectors.selectImages),
      store$.select(ContainerSelectors.selectDate),
      store$.select(RouterSelectors.selectContainerId)
    ),
    mergeMap(([isHighResolution, images, date, containerId]) =>
      images.map((image) => ({
        containerId: containerId ?? '',
        image: isHighResolution
          ? image.data.highResolution
          : image.data.lowResolution,
        imageFileDate: date,
        imageFileName: image.name,
        isHighResolution: isHighResolution,
        userName,
      }))
    )
  );
