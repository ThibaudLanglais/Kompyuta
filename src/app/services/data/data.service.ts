import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Data, Pc, QueryParams, ComponentInterface } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataState = new Subject<Data>();
  dataValue: Data = {components: [], pcs: []};
  dataFetched: boolean = false;
  componentsObservable: Observable<any> = new Observable();
  pcsObservable: Observable<Pc[]> = new Observable();

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

  searchItems(params: QueryParams, perPage?: number): (Pc|ComponentInterface)[][]{
    var pagesTmp: (Pc|ComponentInterface)[][] = [], tmp: (Pc|ComponentInterface)[] = [];
    if(params.query != null){
      params.query.split(' ').forEach((param: string)=>{
        tmp = this.dataValue.pcs;
        tmp = tmp.concat(this.dataValue.components);
        tmp = tmp.filter((el: ComponentInterface|Pc) => JSON.stringify(el).toLowerCase().indexOf(param.toLowerCase()) != -1)
      })
    }else if(params.tags != null){
      var tags = JSON.parse(params.tags);
      tmp = this.dataValue.pcs.filter((el: Pc) => {
        var counter = 0;
        Object.keys(tags).forEach((key: string) => {
          if(el.tags?.includes(tags[key])) counter++;
        })
        // Si plus de 50% des tags correspondent, on renvoie le produit
        return counter/Object.keys(tags).length > 0.5;
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

  getTotalPrice(pc: Pc): number{
    var price = 0;
    this.dataFetched && Object.keys(pc.system).forEach((key: any) =>{
      var tmp: ComponentInterface|null = this.getComponentById(pc.system[key as keyof typeof pc.system])
      if(tmp) price += parseFloat(tmp.prix.toString())
    })
    return parseFloat(price.toFixed(2))
  }

  getSimilarProducts(pc: Pc): Pc[]{
    return this.dataValue.pcs.filter(el => el.id != pc.id && el.type == pc.type && el.tags?.filter((value: string) => pc.tags?.includes(value)).length >= 3)
  }

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