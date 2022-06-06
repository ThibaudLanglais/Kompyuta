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


  // Composant permettant de gérer les trois catégories d'objets
  // pc fixes - pc portables - composants

  title: string = '';
  subtitle: string = '';
  data: any[] = [];
  // Données filtrées selon la page
  filteredData: any[] = [];

  // Champs du formulaire de sélection
  filtersForm: FormGroup;
  priceMin: number = 0;
  priceMax: number = 0;

  // Ensemble des titres et sous-titres selon la page
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
    // Au chargement, on récupère la page souhaitée et on sélectionne le bon titre/sous-titre
    this.route.params.subscribe((val: any)=>{
      this.title = this.categoriesTable[val.slug].title;
      this.subtitle = this.categoriesTable[val.slug].subtitle;
      // Récupération des données souhaitées (fixe, portable, composants)
      this.data = this.filteredData = this.dataService.getItemsByCat(val.slug);
      this.initForm(val);
      // Update des données si besoin
      this.dataService.dataSubscription().subscribe((serviceData: any) => {
        this.data = this.filteredData = this.dataService.getItemsByCat(val.slug);
        this.initForm(val);
      })
    })
  }

  initForm(val: any){
    // On cherche le prix minimum et maximum pour filtrer
    // ces valeurs sont utiles dans l'HTML pour gérer le champs input:range
    var tmpMin: any, tmpMax: any;
    this.data.forEach(el=>{
      if(!tmpMin || tmpMin > this.dataService.getTotalPrice(el)) tmpMin = this.dataService.getTotalPrice(el)
      if(!tmpMax || tmpMax < this.dataService.getTotalPrice(el)) tmpMax = this.dataService.getTotalPrice(el)
      this.priceMax = tmpMax
      this.priceMin = tmpMin
    })
  }

  onFiltersSubmit(){
    // Tri des données à chaque confirmation via le bouton 'confirmer la sélection'
    this.filteredData = this.data.filter((el:any)=>el.prix >= this.filtersForm.controls['priceControl'].value)
  }

}
