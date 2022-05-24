import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../services/data/data-service.service';
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


  constructor(private route: ActivatedRoute, private dataService: DataServiceService, private router: Router, private panierService: PanierService) { 
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((val: any)=>{
      this.dataService.getPcs().subscribe((pcs: any) => {
        pcs = pcs.filter((el: any) => el.id == val.id)
        if(pcs.length > 0) {
          pcs = this.dataService.addImages(pcs)
          this.data = pcs[0]
          this.currentImage = this.data.images[0]
          this.data.images = this.data.images.filter((a:string)=>a != this.currentImage);
          var positive = Math.ceil((this.data.reviews.positive*5)/(this.data.reviews.positive + this.data.reviews.negative))
          this.filledStars = Array(positive)
          this.shallowStars = Array(5-positive)
        }
        else this.router.navigate([''])
      });    
    })
  }
  
  updateMain(newMain: String){
    var tmp = this.currentImage;
    this.currentImage = newMain;
    this.data.images = this.data.images.filter((a: string)=>a != this.currentImage);
    this.data.images.push(tmp);
  }

  onClickAjouterPanier(){
    this.panierService.addPanier(this.data)
  }

}
