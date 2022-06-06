import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-icon-button',
  templateUrl: './text-icon-button.component.html',
  styleUrls: ['./text-icon-button.component.scss']
})
export class TextIconButtonComponent implements OnInit {

  // Composant que l'on retrouve à plusieurs endroits du site
  // personnalisable avec une icone ou non
  // un texte ou non, 
  // ainsi qu'une couleur de texte et de fond 

  @Input() text?: string;
  @Input() image?: string;
  @Input() color?: string;
  @Input() bg?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
