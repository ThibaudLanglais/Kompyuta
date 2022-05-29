import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pcs: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.pcs = [...this.dataService.dataValue.pcs];
    this.dataService.dataSubscription().subscribe((val: any) => {
      this.pcs = [...val.pcs]
    });
  }

}
