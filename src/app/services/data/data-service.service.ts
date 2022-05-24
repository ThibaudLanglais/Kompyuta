import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  getComponents(){
    return this.http.get('../../assets/jsons/components.json');
  }

  getPcs(){
    return this.http.get('../../assets/jsons/pcs.json');
  }

  addImages(array: any[]){
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
