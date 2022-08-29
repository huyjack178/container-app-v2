import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingDialogComponent } from './components/setting-dialog/setting-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  declarations: [SettingDialogComponent],
  exports: [SettingDialogComponent],
})
export class SettingModule {}
