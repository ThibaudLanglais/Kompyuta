import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data/data.service';
import { PanierService } from '../services/panier/panier.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit, OnChanges {

  // Composant que l'on retrouve à plusieurs endroits du site
  // affichant un composant sous la forme d'une ligne
  // avec image?, nom, prix? et actions?.

  @Input() item: any | number;
  @Input() trash?: string;
  @Input() index?: number;
  @Input() configurateur?: boolean = false;
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private panierService: PanierService, public dataService: DataService, private router: Router) { 
  }

  // Pour forcer l'update
  ngOnChanges(changes: SimpleChanges): void {
    this.init()
  }

  ngOnInit(): void {
    this.init()
  }

  deleteFromPanier(index: number){
    this.panierService.deleteFromPanier(index);
  }

  onEditClick(){
    // Si l'on vient du configurateur, permet simplement de renvoyer à la page
    // parente le type de composant (cpu, cg, hdd, ram)
    if(this.configurateur) this.buttonClicked.emit(this.item.componentType || this.item.composant);

    // Sinon, permet d'éditer un pc en se rendant sur la page du configurateur
    else this.router.navigate(['configurateur'], {queryParams: {pcData: encodeURIComponent(JSON.stringify(this.item))}})
  }

  init(){
    // Récupère les données uniquement si c'est un ID qui a été passé
    // en paramètre [item] du composant, auquel cas les informations de l'item
    // ne sont pas encore connues, il faut les fetch
    if(typeof this.item == 'number' ){
      var tmp = this.item;
      this.item = undefined;
      this.dataService.getComponents()
      this.dataService.getPcs()
      this.dataService.dataSubscription().subscribe((val: any) => {
        this.item = this.dataService.getComponentById(tmp)
      })
    }
  }
}
