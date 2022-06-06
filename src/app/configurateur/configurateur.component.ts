import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentInterface, Data, Pc } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';
import { PanierService } from '../services/panier/panier.service';

@Component({
  selector: 'app-configurateur',
  templateUrl: './configurateur.component.html',
  styleUrls: ['./configurateur.component.scss']
})
export class ConfigurateurComponent implements OnInit {
  
  currentPcData: Pc | null = null;
  pcSystemKeys: string[] = [];
  components: ComponentInterface[] = [];
  filteredComponents: ComponentInterface[] = [];
  modalOpened: boolean = false;
  currentComponent: string = '';

  constructor(private route: ActivatedRoute, private router: Router, public dataService: DataService, private panier: PanierService) {
  }

  ngOnInit() {
    // Récupèration des données
    this.dataService.getComponents();
    this.dataService.dataSubscription().subscribe((data: Data) => this.components = data.components);
    this.route.queryParams
      .subscribe(params => {
        if(params['pcData']){
          this.currentPcData = JSON.parse(decodeURIComponent(params['pcData']));
          if(this.currentPcData) this.pcSystemKeys = Object.keys(this.currentPcData.system);
        }
      }
    );
  }

  // Quand on appuie sur éditer le composant
  // enregistre le composant édité (ram, cpu, cg, hdd)
  // et récupère les composants selon le type
  handleEditClick(componentType: string){
    this.currentComponent = componentType
    this.modalOpened = true;
    this.filteredComponents = this.components.filter((c:ComponentInterface) => c.composant == componentType)
  }

  // Quand on appuie sur "+" pour sélectionner le composant
  // update le composant du PC en accord avec la sélection
  onSelectItemClick(componentId: number){
    if(this.currentPcData){
      this.currentPcData.system[this.currentComponent as keyof typeof this.currentPcData.system] = componentId;
      this.modalOpened = false;
      
      // Permet de refresh la liste des composants
      this.pcSystemKeys = [...this.pcSystemKeys];
    }
  }

  onModalClose(){
    this.modalOpened = false;
  }

  // Demande au service "panier" d'ajouter le PC au panier
  // ajoute les champs "custom" et "bonus3000"
  // permettant un affichage différent dans le panier
  onConfirmPcClick(){
    if(this.currentPcData){
      this.currentPcData.custom = true;
      this.currentPcData.bonus3000 = true;
      this.panier.addPanier(this.currentPcData)
    }
  }
}
