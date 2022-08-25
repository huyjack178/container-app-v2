import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class SharedModule {}
