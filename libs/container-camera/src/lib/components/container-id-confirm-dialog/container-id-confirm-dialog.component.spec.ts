import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerIdConfirmDialogComponent } from './container-id-confirm-dialog.component';

describe('ContainerIdConfirmDialogComponent', () => {
  let component: ContainerIdConfirmDialogComponent;
  let fixture: ComponentFixture<ContainerIdConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerIdConfirmDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerIdConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
