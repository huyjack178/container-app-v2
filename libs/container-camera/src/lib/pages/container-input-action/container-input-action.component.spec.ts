import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInputActionComponent } from './container-input-action.component';

describe('ContainerInputActionComponent', () => {
  let component: ContainerInputActionComponent;
  let fixture: ComponentFixture<ContainerInputActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerInputActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerInputActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
