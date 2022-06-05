import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentInterface, Pc } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-modale',
  templateUrl: './modale.component.html',
  styleUrls: ['./modale.component.scss']
})
export class ModaleComponent implements OnInit {

  @Input() filteredElements: any[] = [];
  @Input() modalOpened: boolean = false;
  @Input() currentComponent: string = '';
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectItemEvent: EventEmitter<number> = new EventEmitter<number>();
  dataService: DataService;

  constructor(private dataS: DataService) {
    this.dataService = dataS
  }

  ngOnInit(): void {
  }

  onSelectItemClick(componentId: number){
    this.modalOpened = false;
    this.selectItemEvent.emit(componentId);
  }

  onCloseModalClick(){
    this.modalClosed.emit(false);
  }
}
