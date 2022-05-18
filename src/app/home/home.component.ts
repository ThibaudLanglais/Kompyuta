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
      this.pcs = this.dataService.addImages(val)     
    });
  }

}
