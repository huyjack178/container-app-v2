import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation,} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {combineLatest} from 'rxjs';
import {ContainerFacade} from '@container-management/container-camera';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'container-management-external-link-popup',
  templateUrl: './external-link-popup.component.html',
  styleUrls: ['./external-link-popup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLinkPopupComponent implements OnInit {
  private static readonly secret: string = 'ContainerAppSecretxHnMxQLIl8PMF8KI2xsYpU';

  url$ = combineLatest(
    [
      this.facade.externalUrls$,
      this.facade.selectContainerId$,
      this.facade.containerDate$,
    ],
    (externalUrls, containerId, containerDate) => {
      return `${
        externalUrls[this.data.urlName]
      }?containerId=${containerId}&containerDate=${containerDate.format()}&secret=${ExternalLinkPopupComponent.secret}&userName=${localStorage.getItem('userName')}`;
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { urlName: string },
    readonly facade: ContainerFacade,
    readonly sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.facade.getExternalUrls();
  }
}
