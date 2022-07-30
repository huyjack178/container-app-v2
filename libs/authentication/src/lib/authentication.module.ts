import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const authenticationRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LoginComponent },
    ]),
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthenticationModule {}
