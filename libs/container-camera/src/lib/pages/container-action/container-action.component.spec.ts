import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerActionComponent } from './container-action.component';

describe('ContainerActionComponent', () => {
  let component: ContainerActionComponent;
  let fixture: ComponentFixture<ContainerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
