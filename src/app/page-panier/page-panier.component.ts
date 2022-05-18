import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier/panier.service';

@Component({
  selector: 'app-page-panier',
  templateUrl: './page-panier.component.html',
  styleUrls: ['./page-panier.component.scss']
})
export class PagePanierComponent implements OnInit {

  data: any[] = [];

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.panierService.panierSubscription().subscribe((val: any)=> this.data = val.items)
    this.panierService.getPanier();
  }

  onClickCommander(){
    this.panierService.deletePanier();
  }

}
