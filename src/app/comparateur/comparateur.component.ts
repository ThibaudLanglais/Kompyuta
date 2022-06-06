import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pc } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.scss']
})
export class ComparateurComponent implements OnInit {

  // Page du comparateur

  modalOpened: boolean = false;
  currentPcData1: Pc|null = null;
  currentPcData2: Pc|null = null;
  pcSystemKeys: string[] = [];
  currentlySelectedPc: number|null = null;
  constructor(private route: ActivatedRoute, public dataService: DataService) {
    // Le service est public pour être utilisé depuis l'HTML
  }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      // Récupération des JSONs dans l'URL des PCs à comparer (si présents)
      if(params['pcData1']){
        this.currentPcData1 = JSON.parse(decodeURIComponent(params['pcData1']));
        if(this.currentPcData1) this.pcSystemKeys = Object.keys(this.currentPcData1.system);
      }
      else if(params['pcData2']){
        this.currentPcData2 = JSON.parse(decodeURIComponent(params['pcData2']));
        if(this.currentPcData2) this.pcSystemKeys = Object.keys(this.currentPcData2.system);
      }
    }
  );
  }

  // Quand on appuie sur le bouton permettant de changer le PC comparé
  // stocke si c'est celui de gauche ou droite
  onSelectPcClick(index: number){
    this.modalOpened = true;
    this.currentlySelectedPc = index;
  }
  onModalClosed(){
    this.modalOpened = false;
  }

  // Quand on appuie sur le bouton "+" sélectionnant un PC
  // Récupère les données du PC et update le bon côté
  onSelectPc(pcId: number){
    this.onModalClosed()
    if(this.currentlySelectedPc == 1){
      this.currentPcData1 = this.dataService.getPcFromId(pcId)
    }else if(this.currentlySelectedPc == 2){
      this.currentPcData2 = this.dataService.getPcFromId(pcId)
    }
  }
}
