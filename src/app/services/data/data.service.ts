import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataState = new Subject<Data>();
  dataValue: Data = {components: [], pcs: []};

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
      this.nextValue();
    });
  }
  
  getPcs(): void{
    this.http.get('../../assets/jsons/pcs.json').subscribe((val: any) =>{
      this.dataValue.pcs = this.addImages(val);
      this.nextValue();
    });
  }

  getPcFromId(id: number): any{
    console.log(id);
    return this.dataValue.pcs.filter((el: any) => el.id == id)[0];
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

  searchItems(params: string[], perPage?: number): any[]{
    var pagesTmp = [], tmp: any[] = [];
    params.forEach(param=>{
      tmp = this.dataValue.pcs.concat(this.dataValue.components).filter((el: any) => JSON.stringify(el).toLowerCase().indexOf(param.toLowerCase()) != -1)
    })
    if(perPage && perPage != -1){
      for (let i = 0; i < tmp.length; i += perPage) {
        pagesTmp.push(tmp.slice(i, i + perPage));
      }
    }else{
      pagesTmp.push(tmp);
    }
    return pagesTmp;
  }

  addImages(array: any[]): any[]{
    var res: any[] = []
    array.forEach((el:any) => {
      if(el.typeObjet == 'pc'){
        el.images = []
        el.images.push(`${el.marque.toLowerCase()}_${el.nom.toLowerCase()}.jpg`)
        for (let i = 2; i < 4; i++) {
          el.images.push(`${el.marque.toLowerCase()}_${el.nom.toLowerCase()}_${i}.jpg`)
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