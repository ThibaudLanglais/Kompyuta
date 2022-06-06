import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ComponentInterface, Data } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-comparaison',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.scss']
})
export class ComparaisonComponent implements OnInit, OnChanges {

  // Composant gérant la comparaison de deux composants d'un PC

  // Les IDs de chaque composant
  @Input() nbComponent1: number|null = null;
  @Input() nbComponent2?: number;
  
  // Les objets de chaque composant
  component1: ComponentInterface|null = null;
  component2: ComponentInterface|null = null;

  
  constructor(private dataService: DataService) {
  }
  
  // On fetch, et on récupère les (deux) composants demandées
  // Le reste de l'affichage est géré en HTML pour la comparaison
  ngOnInit(): void {
    this.dataService.getComponents()
    this.dataService.dataSubscription().subscribe((val: Data) => {
      if(this.nbComponent1) this.component1 = this.dataService.getComponentById(this.nbComponent1)
      if(this.nbComponent2) this.component2 = this.dataService.getComponentById(this.nbComponent2)
    })
  }

  // L'UI n'était pas update quand les champs @Input() changaient
  // d'où cette fonction pour forcer l'update UI 
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

}
