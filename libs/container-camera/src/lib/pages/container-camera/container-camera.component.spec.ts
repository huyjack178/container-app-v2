import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCameraComponent } from './container-camera.component';

describe('ContainerCameraComponent', () => {
  let component: ContainerCameraComponent;
  let fixture: ComponentFixture<ContainerCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerCameraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
