import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInputComponent } from './container-input.component';

describe('ContainerInputComponent', () => {
  let component: ContainerInputComponent;
  let fixture: ComponentFixture<ContainerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
