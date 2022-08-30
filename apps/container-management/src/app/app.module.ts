import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard, DefaultGuard } from '@container-management/authentication';
import { CommonModule } from '@container-management/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'camera', pathMatch: 'full' },
      {
        path: 'camera',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('@container-management/container-camera').then(
            (module) => module.ContainerCameraModule
          ),
      },
      {
        path: 'login',
        // canActivate: [DefaultGuard],
        loadChildren: () =>
          import('@container-management/authentication').then(
            (module) => module.AuthenticationModule
          ),
      },
    ]),
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [
    AuthGuard,
    DefaultGuard,
    CookieService,
    { provide: 'environment', useValue: environment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
