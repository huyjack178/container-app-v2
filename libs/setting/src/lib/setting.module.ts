import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingDialogComponent } from './components/setting-dialog/setting-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  declarations: [SettingDialogComponent],
})
export class SettingModule {}
