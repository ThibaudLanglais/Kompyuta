import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // Simple composant permettant d'afficher un PC sous forme de carte, 
  // avec une image, un titre et une description
  @Input() data: any;  

  constructor() { }

  ngOnInit(): void {
  }
  
}
