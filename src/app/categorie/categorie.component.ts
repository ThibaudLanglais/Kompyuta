import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data/data.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.filtersForm = new FormGroup({
      priceControl: new FormControl(0)
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((val: any)=>{
      this.title = this.categoriesTable[val.slug].title;
      this.subtitle = this.categoriesTable[val.slug].subtitle;
      //Get the data

      this.data = this.filteredData = this.dataService.getItemsByCat(val.slug);
      this.initForm(val);
      this.dataService.dataSubscription().subscribe((serviceData: any) => {
        this.data = this.filteredData = this.dataService.getItemsByCat(val.slug);
        this.initForm(val);
      })
    })
  }

  initForm(val: any){
    var tmpMin: any, tmpMax: any;
    this.data.forEach(el=>{
      if(!tmpMin || tmpMin > el.prix) tmpMin = el.prix
      if(!tmpMax || tmpMax < el.prix) tmpMax = el.prix
      this.priceMax = tmpMax
      this.priceMin = tmpMin
    })
  }

  onFiltersSubmit(){
    this.filteredData = this.data.filter((el:any)=>el.prix >= this.filtersForm.controls['priceControl'].value)
  }

}
