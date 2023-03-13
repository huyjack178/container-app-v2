import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerActionPanelComponent } from './container-action-panel.component';

describe('ContainerActionPanelComponent', () => {
  let component: ContainerActionPanelComponent;
  let fixture: ComponentFixture<ContainerActionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerActionPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
