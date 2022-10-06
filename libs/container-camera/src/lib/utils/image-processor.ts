import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { ImageSettings } from '@container-management/setting';

export interface ProcessedImage {
  readonly uri: string;
  readonly lowResolution: Blob;
  readonly highResolution: Blob;
}

export const process$ = (
  imageUri: string,
  imageSettings: ImageSettings
): Observable<ProcessedImage> => {
  const imageData$ = new Subject<ProcessedImage>();
  const tempImgElement = new Image();
  tempImgElement.src = imageUri;
  tempImgElement.onload = () => {
    const lowResolutionImage = resizeImage(
      tempImgElement,
      imageSettings.low,
      false
    );

    const highResolutionImage = resizeImage(
      tempImgElement,
      imageSettings.high,
      true
    );

    imageData$.next({
      lowResolution: lowResolutionImage.blob,
      highResolution: highResolutionImage.blob,
      uri: lowResolutionImage.uri,
    });
  };

  return imageData$.asObservable();
};

const resizeImage = (
  imageElement: HTMLImageElement,
  imageMaxSize: number,
  isHighResolution: boolean
): { blob: Blob; uri: string } => {
  const canvas = generateCanvas(imageElement, imageMaxSize);
  writeTextOnCanvas(canvas, isHighResolution, imageElement);
  const uri = canvas.toDataURL('image/jpeg');
  const blob = dataURLToBlob(uri);

  return { blob, uri };
};

const generateCanvas = (imageElement: HTMLImageElement, maxSize: number) => {
  const canvas = document.createElement('canvas');

  let width = imageElement.width;
  let height = imageElement.height;

  if (width > height) {
    if (width > maxSize) {
      height *= maxSize / width;
      width = maxSize;
    }
  } else {
    if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }
  }

  canvas.width = width;
  canvas.height = height;

  return canvas;
};

const writeTextOnCanvas = (
  canvas: HTMLCanvasElement,
  isHighResolution: boolean,
  imageElement: HTMLImageElement
) => {
  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  let fontSize;
  const isLandscape = canvas.width > canvas.height;

  if (isMobile()) {
    if (isHighResolution) {
      fontSize = isLandscape ? 7 : 15;
    } else {
      fontSize = isLandscape ? 3 : 6;
    }
  } else {
    if (isHighResolution) {
      fontSize = isLandscape ? 2 : 5;
    } else {
      fontSize = isLandscape ? 1 : 2;
    }
  }

  const textY = isHighResolution ? 120 : 50;
  const textX = isHighResolution ? 100 : 50;
  context.font = `bold ${fontSize}vw Courier`;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  context.fillStyle = '#ab240c';
  const text = moment().format('YYYY.MM.DD HH:mm');
  context.fillText(
    text,
    canvas.width - (context.measureText(text).width + textX),
    canvas.height - textY
  );
};

const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

const dataURLToBlob = (dataURL: string) => {
  const BASE64_MARKER = ';base64,';
  let parts: string[];
  let contentType: string;
  let raw: string;

  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    parts = dataURL.split(',');
    contentType = parts[0].split(':')[1];
    raw = parts[1];

    return new Blob([raw], { type: contentType });
  }

  parts = dataURL.split(BASE64_MARKER);
  contentType = parts[0].split(':')[1];
  raw = window.atob(parts[1]);
  const rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};
