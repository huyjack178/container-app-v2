import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import * as moment from 'moment';
import * as JSZip from 'jszip';
import { ContainerImage } from '../+state';
import { saveAs } from 'file-saver';
import { SettingService } from '@container-management/setting';

export interface UploadImagePayload {
  readonly image: Blob;
  readonly opt: string;
  readonly containerId: string;
  readonly imageFileName: string;
  readonly imageFileDate: moment.Moment;
  readonly isHighResolution: boolean;
}

export interface FtpPath {
  readonly folderPath: string;
}

export interface Image {
  readonly src: string;
}

export interface LocalImages {
  readonly path: string;

  readonly images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(
    private readonly http: HttpClient,
    private readonly settingService: SettingService,
    // TODO: Change to strong type
    @Inject('environment') private readonly environment: any
  ) {}

  getFtpPath$(
    opt: string,
    containerId: string,
    containerDate: moment.Moment
  ): Observable<FtpPath> {
    return this.http.post<FtpPath>(`${this.environment.serverUrl}/ftpPath`, {
      opt,
      fileId: containerId,
      fileDate: containerDate.toISOString(),
      userName: this.settingService.getUserName(),
    });
  }

  getLocalImages$(
    opt: string,
    containerId: string,
    containerDate: moment.Moment
  ): Observable<LocalImages> {
    return this.http.post<LocalImages>(
      `${this.environment.serverUrl}/localImages`,
      {
        opt,
        fileId: containerId,
        fileDate: containerDate.toISOString(),
        userName: this.settingService.getUserName(),
        isHighResolution:
          this.settingService.getUploadSettings().local.enabledHigh,
      }
    );
  }

  getFtpImages$(ftpPath: string): Observable<string[]> {
    return this.http.post<string[]>(`${this.environment.serverUrl}/ftpImages`, {
      folderPath: ftpPath,
    });
  }

  downloadFtpImage$(filePath: string): Observable<Image> {
    return this.http.post<Image>(`${this.environment.serverUrl}/ftpDownload`, {
      filePath,
    });
  }

  downloadLocalImage$(filePath: string): Observable<Image> {
    return this.http.post<Image>(
      `${this.environment.serverUrl}/localDownload`,
      {
        filePath,
      }
    );
  }

  uploadToLocalServer$(payload: UploadImagePayload): Observable<void> {
    return this.http.post<void>(
      `${this.environment.serverUrl}/uploadLocal`,
      this.createFormData(payload)
    );
  }

  uploadToFtpServer$(payload: UploadImagePayload): Observable<void> {
    return this.http.post<void>(
      `${this.environment.serverUrl}/uploadFTP`,
      this.createFormData(payload)
    );
  }

  uploadToCloud$(payload: UploadImagePayload): Observable<void> {
    return this.http.post<void>(
      `${this.environment.serverUrl}/uploadCloud`,
      this.createFormData(payload)
    );
  }

  downloadToLocalStorage(
    opt: string,
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
          `${opt}_${containerId}_${imageFileDate.format('YYMMDDHHmmss')}.zip`
        )
      )
    );
  }

  private createFormData(payload: UploadImagePayload) {
    const data = new FormData();
    data.append('file', payload.image, payload.imageFileName);
    data.append('fileId', payload.containerId);
    data.append('opt', payload.opt);

    if (payload.imageFileDate) {
      data.append('fileDate', payload.imageFileDate.toISOString());
    }

    data.append('userName', this.settingService.getUserName());
    data.append('isHighResolution', payload.isHighResolution.toString());

    return data;
  }
}
