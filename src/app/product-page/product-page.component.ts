import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pc } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';
import { PanierService } from '../services/panier/panier.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  // Page affichant le détail d'un produit (PC)

  currentImageIndex: number = 0;
  data: Pc | null = null;
  filledStars: Array<number> = [];
  shallowStars: Array<number> = [];

  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router, private panierService: PanierService) { 
  }
  
  // Récupère les données du PC
  ngOnInit(): void {
    this.route.params.subscribe((val: any)=>{
      this.initData(val)
      this.dataService.dataSubscription().subscribe(() => {
        this.initData(val);
      });
    })
  }
  
  initData(params: any){
    var pc = this.dataService.getPcFromId(params.id);
    // Si un pc est trouvé on instancie deux tableaux pour générer l'HTML des reviews
    if(pc) {
      this.data = pc;
      var positive = Math.ceil((this.data.reviews.positive*5)/(this.data.reviews.positive + this.data.reviews.negative))
      this.filledStars = Array(positive)
      this.shallowStars = Array(5-positive)
    }
    // Sinon si on a pas trouvé de PC (même si les données ont bien été fetched)
    // On va sur la page 404
    else if(this.dataService.dataFetched) {
      this.router.navigate(['404'])
    }
  }

  // Permet d'update quelle photo du produit est affichée en grand
  updateMain(newMain: number){
    this.currentImageIndex = newMain;
  }

  onClickAjouterPanier(){
    if(this.data) this.panierService.addPanier(this.data)
  }

  navigateConfigurateur(){
    this.router.navigate(['configurateur'], {queryParams: {pcData: encodeURIComponent(JSON.stringify(this.data))}})
  }
  
  navigateComparateur(){
    this.router.navigate(['comparateur'], {queryParams: {pcData1: encodeURIComponent(JSON.stringify(this.data))}})
  }

}
