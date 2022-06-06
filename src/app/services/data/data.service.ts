import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Data, Pc, QueryParams, ComponentInterface } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Service gérant les données et permettant des opérations de base
  // sur celles-ci : filtrage, récupération..

  dataState = new Subject<Data>();
  dataValue: Data = {components: [], pcs: []};
  dataFetched: boolean = false;

  constructor(private http: HttpClient) { 
    this.getComponents();
    this.getPcs();
  }

  getComponents(): void{
    this.http.get('../../assets/jsons/components.json').subscribe((val: any) => {
      this.dataValue.components = val;
      if(this.dataValue.pcs.length != 0 && this.dataValue.components.length != 0) this.dataFetched = true;
      this.nextValue();
    });
  }
  
  getPcs(): void{
    this.http.get('../../assets/jsons/pcs.json').subscribe((val: any) =>{
      this.dataValue.pcs = this.addImages(val);
      if(this.dataValue.pcs.length != 0 && this.dataValue.components.length != 0) this.dataFetched = true;
      this.nextValue();
    });
  }

  getPcFromId(id: number): Pc | null{
    return this.dataValue.pcs.filter((el: Pc) => el.id == id)[0];
  }
  
  getComponentById(id: number): ComponentInterface | null{
    return this.dataValue.components.filter((el: ComponentInterface) => el.id == id)[0];
  }

  getItemsByCat(cat: string): (Pc|ComponentInterface)[]{
    if(cat == 'composants'){
      return this.dataValue.components;
    }else{
      return this.dataValue.pcs.filter((pc: Pc) => pc.type == cat);
    }
  }

  nextValue(): void{
    this.dataState.next(this.dataValue);
  }

  dataSubscription(): Observable<Data>{
    return this.dataState.asObservable();
  }

  // Fonction plus complexe pour rechercher des éléments
  searchItems(params: QueryParams, perPage?: number): (Pc|ComponentInterface)[][]{
    var pagesTmp: (Pc|ComponentInterface)[][] = [], tmp: (Pc|ComponentInterface)[] = [];

    // Premier cas : recherche via le champs texte de la navbar
    if(params.query != null){
      params.query.split(' ').forEach((param: string)=>{
        // conversion en string de tout l'objet, et on cherche
        // n'importe où ce que l'utilisateur a cherché
        tmp = this.dataValue.pcs;
        tmp = tmp.concat(this.dataValue.components);
        tmp = tmp.filter((el: ComponentInterface|Pc) => JSON.stringify(el).toLowerCase().indexOf(param.toLowerCase()) != -1)
      })
    // Deuxième cas : on vient du Quizz profil utilisateur
    }else if(params.tags != null){
      // On récupère chaque tag correspondant aux réponses du Quizz
      var tags = JSON.parse(params.tags);
      // On filtre chaque élément (uniquement pc)
      tmp = this.dataValue.pcs.filter((el: Pc) => {
        var counter = 0;
        // On compte combien de choix de l'utilisateur sont présent dans la liste des tags du pC
        Object.keys(tags).forEach((key: string) => {
          if(el.tags?.includes(tags[key])) counter++;
        })
        // Si (plus de) 50% des tags correspondent, on renvoie le produit
        return counter/Object.keys(tags).length >= 0.5;
      })
    }

    // Gère les pages de résultats pour la navigation
    if(perPage && perPage != -1){
      for (let i = 0; i < tmp.length; i += perPage) {
        pagesTmp.push(tmp.slice(i, i + perPage));
      }
    }else{
      pagesTmp.push(tmp);
    }
    return pagesTmp;
  }

  // Parcours les composants d'un PC et additionne leur prix
  getTotalPrice(el: any): number{
    var price = 0;
    if(el.typeObjet == 'pc'){
      this.dataFetched && Object.keys(el.system).forEach((key: any) =>{
        var tmp: ComponentInterface|null = this.getComponentById(el.system[key as keyof typeof el.system])
        if(tmp) price += parseFloat(tmp.prix.toString())
      })
      return parseFloat(price.toFixed(2))
    }else{
      return el.prix;
    }
  }

  // Parcours tous les Pcs autres que celui donné en paramètre
  // et renvoie ceux dont plus de 2 tags sont similaires
  getSimilarProducts(pc: Pc): Pc[]{
    return this.dataValue.pcs.filter(el => el.id != pc.id && el.type == pc.type && el.tags?.filter((value: string) => pc.tags?.includes(value)).length >= 3)
  }

  // Génère le tableau des images de chaque PC selon son ID
  addImages(array: Pc[]): Pc[]{
    var res: Pc[] = []
    array.forEach((el:Pc) => {
      if(el.typeObjet == 'pc'){
        el.images = []
        for (let i = 0; i < 3; i++) {
          el.images.push(`${el.id}_${i}.jpg`)
        }
        res.push(el)
      }
    });
    return res.length > 0 ? res : array;
  }
}