import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-icon-button',
  templateUrl: './text-icon-button.component.html',
  styleUrls: ['./text-icon-button.component.scss']
})
export class TextIconButtonComponent implements OnInit {

  @Input() text?: string;
  @Input() image?: string;
  @Input() color?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
