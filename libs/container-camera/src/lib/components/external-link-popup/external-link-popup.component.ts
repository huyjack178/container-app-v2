import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { ContainerFacade } from '@container-management/container-camera';
import { DomSanitizer } from '@angular/platform-browser';
import { SettingService } from '@container-management/setting';

@Component({
  selector: 'container-management-external-link-popup',
  templateUrl: './external-link-popup.component.html',
  styleUrls: ['./external-link-popup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLinkPopupComponent {
  private static readonly secret: string =
    'ContainerAppSecretxHnMxQLIl8PMF8KI2xsYpU';

  url$ = combineLatest(
    [this.facade.selectContainerId$, this.facade.containerDate$],
    (containerId, containerDate) => {
      return `${
        this.data.url
      }?containerId=${containerId}&containerDate=${containerDate.format()}&secret=${
        ExternalLinkPopupComponent.secret
      }&userName=${this.settingService.getUserName()}`;
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { url: string },
    readonly facade: ContainerFacade,
    readonly sanitizer: DomSanitizer,
    private readonly settingService: SettingService
  ) {}
}
