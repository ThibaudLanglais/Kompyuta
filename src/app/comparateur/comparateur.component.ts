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

  modalOpened: boolean = false;
  currentPcData1: Pc|null = null;
  currentPcData2: Pc|null = null;
  dataService: DataService;
  pcSystemKeys: string[] = [];
  currentlySelectedPc: number|null = null;
  constructor(private route: ActivatedRoute, private dataS: DataService) {
    this.dataService = dataS;
  }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if(params['pcData1']){
        this.currentPcData1 = JSON.parse(decodeURIComponent(params['pcData1']));
        if(this.currentPcData1) this.pcSystemKeys = Object.keys(this.currentPcData1.system);
      }
    }
  );
  }

  onSelectPcClick(index: number){
    this.modalOpened = true;
    this.currentlySelectedPc = index;
  }
  onModalClosed(){
    this.modalOpened = false;
  }
  onSelectPc(pcId: number){
    this.onModalClosed()
    if(this.currentlySelectedPc == 1){
      this.currentPcData1 = this.dataService.getPcFromId(pcId)
    }else if(this.currentlySelectedPc == 2){
      this.currentPcData2 = this.dataService.getPcFromId(pcId)
    }
  }
}
