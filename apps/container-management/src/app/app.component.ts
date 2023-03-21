import { Component } from '@angular/core';
import { SettingService } from '@container-management/setting';

@Component({
  selector: 'container-management-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(readonly settingService: SettingService) {}
}
