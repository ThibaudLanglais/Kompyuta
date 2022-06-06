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
    // A chaque chargement de l'objet breadcrumb, on analyse l'URL
    this.route.url.subscribe((val)=>this.parseUrl(val));
  }

  ngOnInit(): void {
  }

  parseUrl(rawFragments: any[]){
    var array = [];
    var routePrefix = '/';
    // Ajout de la route de base
    array.push({path: routePrefix, name: 'Accueil'});

    // Parcours de chaque fragment de l'URL, ajout du titre et des paramètres s'il y en a
    rawFragments.forEach(el=>{
      routePrefix += `${el.path}${el.params ? '?' + el.params : ''}/`;
      array.push({path: routePrefix, name: el.path})
    });

    // Tableau des fragments final pour construire l'HTML ainsi que les liens Angular
    this.fragments = this.fragments.concat(array);
  }

}
