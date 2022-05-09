import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public headerSubject: Subject<boolean> = new BehaviorSubject<boolean>(true);
  public headerIsWhite = this.headerSubject.asObservable();
  public url: String = '';
  toggleWhite(val : boolean) {
    this.headerSubject.next(val);
  }

  constructor(private router: Router){
    this.router.events.subscribe((val) => {
      
      if(val instanceof NavigationEnd){
        const str = this.router.parseUrl(val.url).root.children['primary']?.segments.map(it => it.path).join('/') || '/';
        this.toggleWhite(str == '/');
        this.url = str;
      }
    });

    window.addEventListener('scroll', ()=> {
      if(this.url == '/') this.toggleWhite(window.scrollY <= window.innerHeight);
    })
  }

}
