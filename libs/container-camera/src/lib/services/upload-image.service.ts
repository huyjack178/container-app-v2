import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import * as JSZip from 'jszip';
import { ContainerImage } from '../+state';
import { saveAs } from 'file-saver';

export interface UploadImagePayload {
  readonly image: Blob;
  readonly containerId: string;
  readonly imageFileName: string;
  readonly imageFileDate: moment.Moment;
  readonly userName: string;
  readonly isHighResolution: boolean;
}

export interface FtpPath {
  readonly folderPath: string;
}

export interface FtpImage {
  readonly src: string;
}

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService,
    // TODO: Change to strong type
    @Inject('environment') private readonly environment: any
  ) {}

  getFtpPath$(
    containerId: string,
    containerDate: moment.Moment,
    userName: string
  ): Observable<FtpPath> {
    return this.http.post<FtpPath>(`${this.environment.serverUrl}/ftpPath`, {
      fileId: containerId,
      fileDate: containerDate.toISOString(),
      userName: userName.toUpperCase(),
    });
  }

  getFtpImages$(ftpPath: string): Observable<string[]> {
    return this.http.post<string[]>(`${this.environment.serverUrl}/ftpImages`, {
      folderPath: ftpPath,
    });
  }

  downloadFtpImage$(filePath: string): Observable<FtpImage> {
    return this.http.post<FtpImage>(
      `${this.environment.serverUrl}/ftpDownload`,
      {
        filePath,
      }
    );
  }

  uploadToLocalServer$(payload: UploadImagePayload): Observable<void> {
    return this.http.post<void>(
      `${this.environment.serverUrl}/uploadLocal`,
      UploadImageService.createFormData(payload)
    );
  }

  uploadToFtpServer$(payload: UploadImagePayload): Observable<void> {
    return this.http.post<void>(
      `${this.environment.serverUrl}/uploadFTP`,
      UploadImageService.createFormData(payload)
    );
  }

  uploadToCloud$(payload: UploadImagePayload): Observable<void> {
    return this.http.post<void>(
      `${this.environment.serverUrl}/uploadCloud`,
      UploadImageService.createFormData(payload)
    );
  }

  downloadToLocalStorage(
    containerId: string,
    images: ContainerImage[],
    imageFileDate: moment.Moment
  ): Observable<void> {
    const zip = new JSZip();

    for (const image of images) {
      zip.file(`${image.name}.jpg`, image.data.lowResolution);
    }

    return from(zip.generateAsync({ type: 'blob' })).pipe(
      map((content) =>
        saveAs(
          content,
          `${containerId}_${imageFileDate.format('YYMMDDHHmmss')}.zip`
        )
      )
    );
  }

  private static createFormData(payload: UploadImagePayload) {
    const data = new FormData();
    data.append('file', payload.image, payload.imageFileName);
    data.append('fileId', payload.containerId);

    if (payload.imageFileDate) {
      data.append('fileDate', payload.imageFileDate.toISOString());
    }

    if (payload.userName) {
      data.append('userName', payload.userName.toUpperCase());
    }

    data.append('isHighResolution', payload.isHighResolution.toString());

    return data;
  }
}
