import {
  AfterViewInit,
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
import { Router } from '@angular/router';
import { NativeCameraComponent } from '../../components/native-camera/native-camera.component';
import { NgForm } from '@angular/forms';
import { isValid } from '../../utils';
import { ContainerIdConfirmDialogComponent } from '../../components';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  Subject,
  takeUntil,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'container-management-container-input-action',
  templateUrl: './container-input-action.component.html',
  styleUrls: ['./container-input-action.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerInputActionComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('nativeCameraComponent')
  nativeCameraComponent!: NativeCameraComponent;
  @ViewChild('containerInputForm') containerInputForm!: NgForm;

  readonly containerIdSubject = new BehaviorSubject('');
  readonly containerId$ = this.containerIdSubject.asObservable();

  readonly optSubject = new BehaviorSubject('');
  readonly opt$ = this.optSubject.asObservable();

  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    readonly settingService: SettingService,
    readonly containerFacade: ContainerFacade,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    @Inject('environment') private readonly environment: any
  ) {}

  ngOnInit(): void {
    this.containerFacade.selectContainerId$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.containerIdSubject.next(value);
      });
  }

  ngAfterViewInit(): void {
    if (this.containerInputForm) {
      this.containerInputForm.statusChanges
        ?.pipe(
          distinctUntilChanged(),
          takeUntil(this.unsubscribe$),
          filter((status) => status === 'VALID')
        )
        .subscribe((status) => {
          const containerId = this.containerInputForm.value.containerId;
          const opt = this.containerInputForm.value.opt;

          if (!isValid(containerId)) {
            this.dialog.open(ContainerIdConfirmDialogComponent, {
              width: '250px',
            });
          }

          this.containerFacade.setContainerId({
            opt,
            containerId,
          });
        });
    }
  }

  containerIdChange(input: string) {
    this.containerIdSubject.next(input.toUpperCase());
  }

  optChange(input: string) {
    this.optSubject.next(input.toUpperCase());
  }

  openCamera() {
    const serverSettings = this.settingService.getServerSettings();
    if (serverSettings.optList.length > 0) {
      if (!serverSettings.optList.includes(this.optSubject.value)) {
        this.snackBar.open(
          'OPT không tồn tại trong danh sách hàng tàu!',
          'Đóng',
          {
            duration: 5000,
          }
        );

        return;
      }
    }

    this.startCamera();
  }

  capture() {
    if (this.environment.useNativeCamera == 'yes') {
      return this.nativeCameraComponent.openCamera(
        this.containerIdSubject.value
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

  private startCamera() {
    if (this.environment.useNativeCamera === 'no') {
      return this.router.navigate([this.router.url, 'camera'], {
        queryParams: {
          containerId: this.containerIdSubject.value,
        },
      });
    }

    return this.nativeCameraComponent.openCamera(this.containerIdSubject.value);
  }
}
