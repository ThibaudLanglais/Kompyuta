import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  fragments: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe((val)=>this.parseUrl(val));
  }

  ngOnInit(): void {
  }

  parseUrl(rawFragments: any[]){
    var array = [];
    var routePrefix = '/';
    array.push({path: routePrefix, name: 'Accueil'});
    rawFragments.forEach(el=>{
      routePrefix += `${el.path}${el.params ? '?' + el.params : ''}/`;
      array.push({path: routePrefix, name: el.path})
    });
    this.fragments = this.fragments.concat(array);
  }

}
