import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  panierState = new Subject<Panier>();
  panierValue: Panier = {items: []};

  constructor() {
    this.getPanier()
  }

  getPanier(){
    var res = localStorage.getItem('panier');
    if(res) {
      this.panierValue = JSON.parse(res);
      this.panierState.next(this.panierValue);
    }
  }

  setPanier(){
    localStorage.setItem('panier', JSON.stringify(this.panierValue));
  }

  addPanier(element: any){
    this.panierValue.items.push(element);
    this.panierState.next(this.panierValue);
    this.setPanier()
  }

  deleteFromPanier(element: number){
    if(this.panierValue.items.length > element){
      this.panierValue.items.splice(element, 1);
      this.panierState.next(this.panierValue)
      this.setPanier()
    }
  }

  deletePanier(){
    this.panierValue.items = [];
    this.panierState.next(this.panierValue);
    this.setPanier()
  }

  panierSubscription(): Observable<Panier>{
    return this.panierState.asObservable();
  }

}

interface Panier {
  items: any[];
}