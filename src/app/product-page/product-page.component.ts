import { Component, Input, OnInit } from '@angular/core';

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
  
  constructor() { 
    this.currentImage = this.images[0];
    this.images = this.images.filter((a)=>a != this.currentImage);
  }

  ngOnInit(): void {
  }

  updateMain(newMain: String){
    var tmp = this.currentImage;
    this.currentImage = newMain;
    this.images = this.images.filter((a)=>a != this.currentImage);
    this.images.push(tmp);
  }

}
