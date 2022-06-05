import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ComponentInterface, Data } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-comparaison',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.scss']
})
export class ComparaisonComponent implements OnInit, OnChanges {

  @Input() nbComponent1: number|null = null;
  @Input() nbComponent2?: number;
  
  component1: ComponentInterface|null = null;
  component2: ComponentInterface|null = null;

  
  constructor(private dataService: DataService) {
  }
  
  ngOnInit(): void {
    this.dataService.getComponents()
    this.dataService.dataSubscription().subscribe((val: Data) => {
      if(this.nbComponent1) this.component1 = this.dataService.getComponentById(this.nbComponent1)
      if(this.nbComponent2) this.component2 = this.dataService.getComponentById(this.nbComponent2)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

}
