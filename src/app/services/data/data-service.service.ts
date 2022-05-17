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
}
