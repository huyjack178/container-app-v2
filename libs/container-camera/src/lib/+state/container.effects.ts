import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContainerActions from './container.actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import {
  UploadImagePayload,
  UploadImageService,
} from '../services/upload-image.service';
import { map, Observable, of, pipe, UnaryFunction, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ContainerSelectors from './container.selectors';
import * as moment from 'moment';
import { ExternalUrlsService } from '../services/external-urls.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ContainerEffects {
  uploadContainerImagesToLocal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.uploadImagesToLocal),
      mapUploadImages(this.store$),
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
      mapUploadImages(this.store$),
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
        console.log(error);
        throw new Error(error);
      })
    )
  );

  uploadContainerImagesToCloud$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.uploadImagesToCloud),
      mapUploadImages(this.store$),
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
          this.store$.select(ContainerSelectors.selectContainerId),
          this.store$.select(ContainerSelectors.selectOpt)
        ),
        mergeMap(([a, images, date, containerId, opt]) =>
          this.uploadService.downloadToLocalStorage(
            opt,
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
        this.store$.select(ContainerSelectors.selectContainerId),
        this.store$.select(ContainerSelectors.selectOpt)
      ),
      mergeMap(([a, date, containerId, opt]) =>
        this.uploadService.getFtpPath$(opt, containerId ?? '', date).pipe(
          map((response) =>
            ContainerActions.getUploadedPathSuccessfully({
              path: response.folderPath,
            })
          )
        )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  getImagesFromFtpWithPath$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.getFtpImagesWithPath),
      withLatestFrom(this.store$.select(ContainerSelectors.selectUploadedPath)),
      mergeMap(([a, path]) =>
        this.uploadService
          .getFtpImages$(path)
          .pipe(
            map((images) =>
              ContainerActions.getUploadedImagesSuccessfully({ path, images })
            )
          )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  getImagesFromFtpWithContainerId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.getFtpImagesWithContainerId),
      withLatestFrom(
        this.store$.select(ContainerSelectors.selectContainerId),
        this.store$.select(ContainerSelectors.selectOpt)
      ),
      mergeMap(([a, containerId, opt]) =>
        this.uploadService.getFtpPath$(opt, containerId, moment()).pipe(
          switchMap(({ folderPath }) =>
            this.uploadService.getFtpImages$(folderPath).pipe(
              map((images) =>
                ContainerActions.getUploadedImagesSuccessfully({
                  images,
                  path: folderPath,
                })
              )
            )
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
      withLatestFrom(this.store$.select(ContainerSelectors.selectUploadedPath)),
      mergeMap(([action, path]) =>
        this.uploadService.downloadFtpImage$(path + action.fileName).pipe(
          map((ftpImage) =>
            ContainerActions.getUploadedImageSuccessfully({
              uploadedImageSrc: ftpImage.src,
            })
          )
        )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  getImagesFromLocal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.getLocalImages),
      withLatestFrom(
        this.store$.select(ContainerSelectors.selectContainerId),
        this.store$.select(ContainerSelectors.selectDate),
        this.store$.select(ContainerSelectors.selectOpt)
      ),
      mergeMap(([a, containerId, containerDate, opt]) =>
        this.uploadService
          .getLocalImages$(opt, containerId, containerDate)
          .pipe(
            map(({ images, path }) =>
              ContainerActions.getUploadedImagesSuccessfully({ images, path })
            )
          )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  getLocalImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.downloadLocalImage),
      withLatestFrom(this.store$.select(ContainerSelectors.selectUploadedPath)),
      mergeMap(([action, path]) =>
        this.uploadService
          .downloadLocalImage$(path + '/' + action.fileName)
          .pipe(
            map(({ src }) =>
              ContainerActions.getUploadedImageSuccessfully({
                uploadedImageSrc: src,
              })
            )
          )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  getExternalUrls$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.getExternalUrls),
      mergeMap((action) =>
        this.externalUrlsService.getExternalUrls$().pipe(
          map((externalUrls) =>
            ContainerActions.getExternalUrlsSuccessfully({
              externalUrls,
            })
          )
        )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    )
  );

  storeContainerOpt$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ContainerActions.setContainerId),
        mergeMap((action) => {
          action.opt && this.cookieService.set('OPT', action.opt);
          return of(null);
        })
      ),
    {
      dispatch: false,
    }
  );

  loadOpt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContainerActions.loadOptFromStorage),
      map(() => {
        const opt = this.cookieService.get('OPT');
        return ContainerActions.setContainerId({
          opt: opt ?? '',
          containerId: '',
        });
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly uploadService: UploadImageService,
    private readonly externalUrlsService: ExternalUrlsService,
    private readonly cookieService: CookieService,
    private readonly store$: Store
  ) {}
}

const mapUploadImages = (
  store$: Store
): UnaryFunction<
  Observable<{ isHighResolution: boolean; isForceUpload?: boolean }>,
  Observable<UploadImagePayload>
> => {
  return pipe(
    withLatestFrom(
      store$.select(ContainerSelectors.selectImages),
      store$.select(ContainerSelectors.selectDate),
      store$.select(ContainerSelectors.selectContainerId),
      store$.select(ContainerSelectors.selectOpt)
    ),
    mergeMap(
      ([{ isHighResolution, isForceUpload }, images, date, containerId, opt]) =>
        images
          .filter((image) => {
            if (isForceUpload) {
              return true;
            }

            return !image.isUploadedAfterCapture;
          })
          .map((image) => ({
            opt,
            containerId: containerId ?? '',
            image: isHighResolution
              ? image.data.highResolution
              : image.data.lowResolution,
            imageFileDate: date,
            imageFileName: image.name,
            isHighResolution: isHighResolution,
          }))
    )
  );
};
