import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () =>
          import('@container-management/authentication').then(
            (module) => module.AuthenticationModule
          ),
      },
      {
        path: 'camera',
        loadChildren: () =>
          import('@container-management/container-camera').then(
            (module) => module.ContainerCameraModule
          ),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
