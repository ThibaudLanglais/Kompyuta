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

  currentImage: String = '';
  data: any;
  filledStars: any;
  shallowStars: any;


  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router, private panierService: PanierService) { 
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
      this.currentImage = this.data.images[0]
      this.data.images = this.data.images.filter((a:string)=>a != this.currentImage);
      var positive = Math.ceil((this.data.reviews.positive*5)/(this.data.reviews.positive + this.data.reviews.negative))
      this.filledStars = Array(positive)
      this.shallowStars = Array(5-positive)
    }
    else if(this.dataService.dataValue) this.router.navigate([''])
  }

  updateMain(newMain: String){
    var tmp = this.currentImage;
    this.currentImage = newMain;
    this.data.images = this.data.images.filter((a: string)=> a != this.currentImage);
    this.data.images.push(tmp);
  }

  onClickAjouterPanier(){
    this.panierService.addPanier(this.data)
  }

  navigateConfigurateur(){
    this.router.navigate(['configurateur'], {queryParams: {pcData: encodeURIComponent(JSON.stringify(this.data))}})
  }

}
