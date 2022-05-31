import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { PanierService } from '../services/panier/panier.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit, OnChanges {

  @Input() item: any | number;
  @Input() trash?: string;
  @Input() index?: number;
  @Input() configurateur?: boolean = false;
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private panierService: PanierService, private dataService: DataService) { 
  }
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
    if(this.configurateur) this.buttonClicked.emit(this.item.componentType || this.item.composant);
  }

  init(){
    if(typeof this.item == 'number' ){
      var tmp = this.item;
      this.item = undefined;
      this.dataService.getComponents()
      this.dataService.dataSubscription().subscribe((val: any) => {
        this.item = this.dataService.getComponentById(tmp)
      })
    }
  }
}
