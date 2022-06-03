import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComponentInterface, Data, Pc } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent implements OnInit {

  query: {} = {};
  data: (Pc|ComponentInterface)[] = [];
  filteredData: (Pc|ComponentInterface)[] = [];
  pages:  (Pc|ComponentInterface)[][] = [];
  pageIndex: number = 0;
  perPage: FormControl = new FormControl('5');

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.initData(this.dataService.dataValue);
    this.dataService.dataSubscription().subscribe((serviceData: Data) => this.initData(serviceData));
    this.route.queryParams
      .subscribe((params: {}) => {
        this.query = params;
        this.onParamsChange();
      }
    );
  }

  initData(val: Data){
    if(val){
      this.data = val.components;
      this.data = this.data.concat(val.pcs);
      this.filteredData = this.data
      this.onParamsChange()
    }
  }

  onParamsChange(){
    this.pages = this.dataService.searchItems(this.query, parseInt(this.perPage.value));
    this.pageIndex = 0;
  }

  onPrevClick(){
    if(this.pageIndex > 0) this.pageIndex--;
  }
  onNextClick(){
    if(this.pageIndex < this.pages.length - 1) this.pageIndex++;
  }

  onPerPageChange(){
    this.onParamsChange();
  }

}
