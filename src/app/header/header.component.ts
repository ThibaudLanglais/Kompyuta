import { Component, OnInit, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  routerUrl: String = '';
  whiteClass: boolean = false;
  
  constructor(private router: Router){
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) this.routerUrl = val.url
      this.whiteClass = this.routerUrl == '/'
      if(this.routerUrl == '/'){
        window.addEventListener('scroll', this.updateWhiteClass);
      }else{
        window.removeEventListener('scroll', this.updateWhiteClass);
      }
    });
  }

  ngOnInit(): void {
  }
  
  updateWhiteClass(){
    window.scrollY <= window.innerHeight ? this.whiteClass = true : this.whiteClass = false;
  }
}
