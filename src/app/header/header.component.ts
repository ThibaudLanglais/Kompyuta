import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header/header.service';
import { PanierService } from '../services/panier/panier.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  
  // Navbar du site
  // Un peu complexe puisqu'elle doit changer de couleur sur la page d'accueil
  // quand on scroll de 100vh

  whiteClass: boolean = false;
  menuActive: boolean = false;
  searchActive: boolean = false;
  panierItemsNumber?: Number;
  searchFormGroup: FormGroup = new FormGroup({
    query: new FormControl('')
  });

  constructor(private service: HeaderService, private panierService: PanierService, private router: Router){
    service.headerIsWhite.subscribe(val => this.whiteClass = val);

    // Update du nombre d'items dans le panier
    this.panierService.panierSubscription().subscribe((val: any) => this.panierItemsNumber = val.items.length)
    this.panierService.getPanier()
  }
  
  ngOnInit(): void {
  }

  // Affiche/cache le menu en responsive
  toggleMenu(){
    this.menuActive = !this.menuActive;
  }

  // Affiche/cache la barre de recherche
  toggleSearch(){
    this.searchActive = !this.searchActive;
  }

  // Quand on submit une recherche dans la barre de recherche, navigue dans la bonne page
  onSearchSubmit(){
    this.router.navigate(['search'], {queryParams: {query: this.searchFormGroup.value.query}})
  }

}
