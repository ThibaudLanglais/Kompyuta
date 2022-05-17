import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pcs: any[] = [];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getPcs().subscribe((val: any) => {
      val.forEach((el:any) => {
        el.images = []
        el.images.push(`${el.marque.toLowerCase()}_${el.nom.toLowerCase()}.jpg`)
        for (let i = 2; i < 4; i++) {
          el.images.push(`${el.marque.toLowerCase()}_${el.nom.toLowerCase()}_${i}.jpg`)
        }
        this.pcs.push(el)
      });      
    });
  }

}
