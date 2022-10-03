import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

export interface UploadImagePayload {
  readonly image: Blob;
  readonly containerId: string;
  readonly imageFileName: string;
  readonly imageFileDate: moment.Moment;
  readonly userName: string;
  readonly isHighResolution: boolean;
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

  downloadToLocalStorage() {
    // const zip = new jsZip();
    //
    // for (const image of this.imageFiles) {
    //   const filesData = image.files;
    //   const fileName = `${image.name}.jpg`;
    //   zip.file(fileName, filesData.low);
    // }
    //
    // zip
    // .generateAsync({ type: 'blob' })
    // .then(content => {
    //   saveAs(content, `${this.containerId}_${this.containerDate.format('YYMMDDHHmmss')}.zip`);
    // })
    // .then(() => {
    //   this.backToHomePage();
    // });
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
