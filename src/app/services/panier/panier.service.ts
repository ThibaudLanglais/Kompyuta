import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Pc } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  // Service de panier se servant du localstorage

  panierState = new Subject<Panier>();
  panierValue: Panier = {items: []};

  constructor(private router: Router) {
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

  addPanier(element: Pc){
    var tmp: Pc = JSON.parse(JSON.stringify(element));
    if(tmp.panierId == null) tmp.panierId = `basket_${Date.now()}_${Math.round(Math.random()*100)}`
    this.panierValue.items = this.panierValue.items.filter((el:Pc) => el.panierId != tmp.panierId);
    this.panierValue.items.push(tmp);
    this.panierState.next(this.panierValue);
    this.setPanier()
    this.router.navigate(['panier'])
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
  items: Pc[];
}