import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../services/data/data-service.service';

@Component({
  selector: 'app-configurateur',
  templateUrl: './configurateur.component.html',
  styleUrls: ['./configurateur.component.scss']
})
export class ConfigurateurComponent implements OnInit {
  
  currentPcData: any = {};
  pcSystemKeys: any[] = [];
  components: any[] = [];
  filteredComponents: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getComponents().subscribe((val: any) => {
      this.components = val
    })
    this.route.queryParams
      .subscribe(params => {
        if(!params['pcData']) this.router.navigate(['404']);
        else{
          this.currentPcData = JSON.parse(decodeURIComponent(params['pcData']));
          this.pcSystemKeys = Object.keys(this.currentPcData.system);
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

  handleEditClick(data: string){
    console.log(data);
  }
}
