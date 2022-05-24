import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data/data-service.service';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent implements OnInit {

  query: string = '';
  data: any[] = [];
  filteredData: any[] = [];
  pages: any[] = [];
  pageIndex: number = 0;
  perPage: FormControl = new FormControl('5');

  constructor(private route: ActivatedRoute, private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getComponents().subscribe((val:any) => this.initData(val))
    this.dataService.getPcs().subscribe((val:any) => this.initData(val))
    this.route.queryParams
      .subscribe(params => {
        this.query = params['query'];
        this.onParamsChange();
      }
    );
  }

  initData(val: any){
    val = this.dataService.addImages(val)
    this.data = this.data.concat(val);
    this.filteredData = this.data
    this.onParamsChange()
  }

  onParamsChange(){
    var params = this.query.split(' ')
    var tmp = this.data;
    var pagesTmp = [];
    params.forEach(param=>{
      tmp = tmp.filter((el: any) => {
        return JSON.stringify(el).toLowerCase().indexOf(param.toLowerCase()) != -1
      })
    })
    if(parseInt(this.perPage.value) != -1){
      for (let i = 0; i < tmp.length; i += parseInt(this.perPage.value)) {
        pagesTmp.push(tmp.slice(i, i + parseInt(this.perPage.value)));
      }
    }else{
      pagesTmp.push(tmp);
    }
    this.pages = pagesTmp;
    this.pageIndex = 0
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
