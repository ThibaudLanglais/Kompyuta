import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderService } from '../services/header/header.service';
import { PanierService } from '../services/panier/panier.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  
  whiteClass = false;
  menuActive = false;
  panierItemsNumber?: Number;

  constructor(private service: HeaderService, private panierService: PanierService){
    service.headerIsWhite.subscribe(val => this.whiteClass = val);
    this.panierService.panierSubscription().subscribe((val: any) => this.panierItemsNumber = val.items.length)
    this.panierService.getPanier()
  }
  
  ngOnInit(): void {
  }

  toggleMenu(){
    this.menuActive = !this.menuActive;
  }

}
