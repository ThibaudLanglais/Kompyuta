import { Component, OnInit } from '@angular/core';
import { Pc } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pcs: Pc[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.pcs = [...this.dataService.dataValue.pcs];
    this.dataService.dataSubscription().subscribe((val: any) => {
      this.pcs = [...val.pcs]
    });
  }

}
