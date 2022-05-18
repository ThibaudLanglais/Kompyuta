import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, toArray } from 'rxjs';
import { DataServiceService } from '../services/data/data-service.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  title: string = '';
  subtitle: string = '';
  data: any[] = [];
  filteredData: any[] = [];

  // Champs du formulaire de sélection

  filtersForm: FormGroup;
  priceMin: number = 0;
  priceMax: number = 0;

  categoriesTable: any = {
    portables: {
      title: 'Ordinateurs portables',
      subtitle: 'Retrouvez nos meilleurs PC portatifs !'
    },
    fixes: {
      title: 'Ordinateurs fixes',
      subtitle: 'Retrouvez nos meilleurs PC fixes !',
    },
    composants: {
      title: 'Composants',
      subtitle: 'Retrouvez tous les ingrédients d’un bon PC !' 
    },
  };
  constructor(private route: ActivatedRoute, private dataService: DataServiceService) {
    this.filtersForm = new FormGroup({
      priceControl: new FormControl(0)
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((val: any)=>{
      this.title = this.categoriesTable[val.slug].title
      this.subtitle = this.categoriesTable[val.slug].subtitle
      //Get the data
      if(val.slug == 'composants'){
        this.dataService.getComponents().subscribe((components:any) => {
          this.data = components
          this.filteredData = this.data
          // this.data = this.dataService.addImages(this.data);
          this.initForm(val)
        });
      }else{
        this.dataService.getPcs().pipe(map((pcs: any) => pcs.filter((pc: any) => pc.type == val.slug))).subscribe((pcs:any) => {
          this.data = pcs
          this.data = this.dataService.addImages(this.data);
          this.filteredData = this.data
          this.initForm(val)
        });
      }
    })
  }

  initForm(val: any){
    if(val.slug != 'composants'){
      var tmpMin: any, tmpMax: any;
      this.data.forEach(el=>{
        if(!tmpMin || tmpMin > el.prix) tmpMin = el.prix
        if(!tmpMax || tmpMax < el.prix) tmpMax = el.prix
        this.priceMax = tmpMax
        this.priceMin = tmpMin
      })
    }
  }

  onFiltersSubmit(){
    this.filteredData = this.data.filter((el:any)=>el.prix >= this.filtersForm.controls['priceControl'].value)
  }

}
