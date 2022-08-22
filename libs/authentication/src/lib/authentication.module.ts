import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const authenticationRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LoginComponent },
    ]),
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthenticationModule {}
