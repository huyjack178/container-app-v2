import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'container-management-container-input',
  templateUrl: './container-input.component.html',
  styleUrls: ['./container-input.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContainerInputComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openCamera() {}
}
