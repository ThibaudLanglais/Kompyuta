import { Component, Input, OnInit } from '@angular/core';
import { PanierService } from '../services/panier/panier.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input() item: any;
  @Input() trash?: string;
  @Input() index?: number;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
  }

  deleteFromPanier(index: number){
    this.panierService.deleteFromPanier(index);
  }
}
