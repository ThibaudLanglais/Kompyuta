import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentInterface, Pc } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-modale',
  templateUrl: './modale.component.html',
  styleUrls: ['./modale.component.scss']
})
export class ModaleComponent implements OnInit {

  // Modale utilisée pour le configurateur et le comparateur

  @Input() filteredElements: any[] = [];
  @Input() modalOpened: boolean = false;
  @Input() currentComponent: string = '';
  
  //Événements de clicks à remonter à la page parente 
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectItemEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
  }

  // Fait remonter au parent l'item sur lequel on clique
  onSelectItemClick(componentId: number){
    this.modalOpened = false;
    this.selectItemEvent.emit(componentId);
  }

  // Fait remonter au parent l'état de la modale pour que la logique fonctionne 
  // toujours après ouvrir/fermer la modale
  onCloseModalClick(){
    this.modalClosed.emit(false);
  }
}
