import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data/data.service';
import { PanierService } from '../services/panier/panier.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  currentImageIndex: number = 0;
  data: any;
  filledStars: any;
  shallowStars: any;
  public dataService: DataService;

  constructor(private route: ActivatedRoute, private dataS: DataService, private router: Router, private panierService: PanierService) { 
    this.dataService = dataS;
  }
  
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
    if(pc) {
      this.data = pc;
      var positive = Math.ceil((this.data.reviews.positive*5)/(this.data.reviews.positive + this.data.reviews.negative))
      this.filledStars = Array(positive)
      this.shallowStars = Array(5-positive)
    }
    else if(this.dataService.dataFetched) {
      this.router.navigate([''])
      console.log("redirecting");
      
    }
  }

  updateMain(newMain: number){
    this.currentImageIndex = newMain;
  }

  onClickAjouterPanier(){
    this.panierService.addPanier(this.data)
  }

  navigateConfigurateur(){
    this.router.navigate(['configurateur'], {queryParams: {pcData: encodeURIComponent(JSON.stringify(this.data))}})
  }

}
