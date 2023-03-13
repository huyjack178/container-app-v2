import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingService } from '@container-management/setting';
import { ContainerFacade } from '@container-management/container-camera';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeCameraComponent } from '../../components/native-camera/native-camera.component';
import { NgForm } from '@angular/forms';
import { isValid } from '../../utils';
import { ContainerIdConfirmDialogComponent } from '../../components';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'container-management-container-input-action',
  templateUrl: './container-input-action.component.html',
  styleUrls: ['./container-input-action.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerInputActionComponent implements OnInit, OnDestroy {
  @ViewChild('nativeCameraComponent')
  nativeCameraComponent!: NativeCameraComponent;
  @ViewChild('containerInputForm') containerInputForm!: NgForm;

  containerIdSubject = new BehaviorSubject('');
  containerId$ = this.containerIdSubject.asObservable();

  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    readonly settingService: SettingService,
    readonly containerFacade: ContainerFacade,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sanitizer: DomSanitizer,
    @Inject('environment') private readonly environment: any
  ) {}

  ngOnInit(): void {
    this.containerFacade.selectContainerId$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.containerIdSubject.next(value);
      });
  }

  containerIdChange(input: string) {
    this.containerIdSubject.next(input.toUpperCase());
  }

  openCamera(form: NgForm) {
    const containerId = form.value.containerId;

    if (!isValid(containerId)) {
      const dialogRef = this.dialog.open(ContainerIdConfirmDialogComponent, {
        width: '250px',
      });

      dialogRef.componentInstance.clickOk.subscribe(() => {
        return this.startCamera(containerId);
      });
    } else {
      this.startCamera(containerId);
    }

    this.containerFacade.setContainerId(containerId);
  }

  capture() {
    if (this.environment.useNativeCamera == 'yes') {
      return this.nativeCameraComponent.openCamera(
        this.activatedRoute.snapshot.queryParamMap.get('containerId') ?? ''
      );
    }

    return this.router.navigate(['container', 'camera'], {
      queryParamsHandling: 'preserve',
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private startCamera(containerId: string) {
    if (this.environment.useNativeCamera === 'no') {
      return this.router.navigate([this.router.url, 'camera'], {
        queryParams: {
          containerId,
        },
      });
    }

    return this.nativeCameraComponent.openCamera(containerId);
  }
}
