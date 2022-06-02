import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataState = new Subject<Data>();
  dataValue: Data = {components: [], pcs: []};
  dataFetched: boolean = false;

  componentsObservable: Observable<any> = new Observable();
  pcsObservable: Observable<any> = new Observable();

  constructor(private http: HttpClient) { 
    this.getComponents();
    this.getPcs();
  }

  //Pas d'unsubscribe car https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
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

  getPcFromId(id: number): any{
    return this.dataValue.pcs.filter((el: any) => el.id == id)[0];
  }
  
  getComponentById(id: number): any{
    return this.dataValue.components.filter((el: any) => el.id == id)[0];
  }


  getItemsByCat(cat: string): any[]{
    if(cat == 'composants'){
      return this.dataValue.components;
    }else{
      return this.dataValue.pcs.filter((pc: any) => pc.type == cat);
    }
  }

  nextValue(): void{
    this.dataState.next(this.dataValue);
  }

  dataSubscription(): Observable<Data>{
    return this.dataState.asObservable();
  }

  searchItems(params: any, perPage?: number): any[]{
    var pagesTmp = [], tmp: any[] = [];
    if(params.query != null){
      params.query.split(' ').forEach((param: string)=>{
        tmp = this.dataValue.pcs.concat(this.dataValue.components).filter((el: any) => JSON.stringify(el).toLowerCase().indexOf(param.toLowerCase()) != -1)
      })
    }else if(params.tags != null){
      var tags = JSON.parse(params.tags);
      console.log(tags);
      tmp = this.dataValue.pcs.filter((el: any) => {
        var counter = 0;
        if(el.tags) console.log(el.tags);
        Object.keys(tags).forEach((key: string) => {
          if(el.tags?.includes(tags[key])) counter++;
        })
        // Si plus de 50% des tags correspondent, on renvoie le produit
        return counter/tags.length > 0.5;
      })
    }
    if(perPage && perPage != -1){
      for (let i = 0; i < tmp.length; i += perPage) {
        pagesTmp.push(tmp.slice(i, i + perPage));
      }
    }else{
      pagesTmp.push(tmp);
    }
    return pagesTmp;
  }

  getTotalPrice(pc: any): number{
    var price = 0;
    this.dataFetched && Object.keys(pc.system).forEach(key =>{
      var tmp = this.getComponentById(pc.system[key])
      price += parseFloat(tmp.prix)
    })
    return price
  }

  addImages(array: any[]): any[]{
    var res: any[] = []
    array.forEach((el:any) => {
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


interface Data {
  pcs: any[],
  components: any[]
}