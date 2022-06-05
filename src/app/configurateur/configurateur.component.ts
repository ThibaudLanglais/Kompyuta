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
  public dataService: DataService;

  constructor(private route: ActivatedRoute, private router: Router, private ds: DataService, private panier: PanierService) {
    this.dataService = ds;
  }

  ngOnInit() {
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

  parse(data: any){
    const acceptedKeys = ['nom', 'modele', 'marque']
    if(typeof data == 'object'){
      var str = ''
      Object.keys(data).filter(a => acceptedKeys.includes(a)).forEach(key=>{
        str += data[key] + ' '
      })
      return str
    }else{
      return data;
    }
  }

  onSelectItemClick(componentId: number){
    if(this.currentPcData){
      this.currentPcData.system[this.currentComponent as keyof typeof this.currentPcData.system] = componentId;
      this.pcSystemKeys = [...this.pcSystemKeys];
      this.modalOpened = false;
    }
  }

  onModalClose(){
    this.modalOpened = false;
  }

  handleEditClick(componentType: string){
    this.currentComponent = componentType
    this.modalOpened = true;
    this.filteredComponents = this.components.filter((c:ComponentInterface) => c.composant == componentType)
  }

  onConfirmPcClick(){
    if(this.currentPcData){
      this.currentPcData.custom = true;
      this.currentPcData.bonus3000 = true;
      this.panier.addPanier(this.currentPcData)
    }
  }
}
