import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExternalUrls {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExternalUrlsService {
  constructor(
    private readonly http: HttpClient,
    @Inject('environment') private readonly environment: any
  ) {}

  getExternalUrls$(): Observable<ExternalUrls> {
    return this.http.get<ExternalUrls>(
      `${this.environment.serverUrl}/externalUrls`
    );
  }
}
