import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../services/data/data-service.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  @Input() images: String[] = [
    '../../assets/ordi_fixes.png',
    '../../assets/ordi_portables.png',
    '../../assets/ordi.png',
  ];
  currentImage: String;
  data: any;


  constructor(private route: ActivatedRoute, private dataService: DataServiceService) { 
    this.currentImage = this.images[0];
    this.images = this.images.filter((a)=>a != this.currentImage);
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((val: any)=>{
      this.dataService.getPcs().subscribe((pcs: any)=>{
        this.data = pcs.filter((a: any) => `${a.marque}_${a.nom}` == val.id)
        console.log(this.data);
        
      })
    })
  }
  
  updateMain(newMain: String){
    var tmp = this.currentImage;
    this.currentImage = newMain;
    this.images = this.images.filter((a)=>a != this.currentImage);
    this.images.push(tmp);
  }

}
