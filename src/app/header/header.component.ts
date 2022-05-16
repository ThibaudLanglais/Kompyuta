import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderService } from '../services/header/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  
  whiteClass = false;
  menuActive = false;

  constructor(private service: HeaderService){
    service.headerIsWhite.subscribe(val => this.whiteClass = val);
  }
  
  ngOnInit(): void {
  }

  toggleMenu(){
    this.menuActive = !this.menuActive;
  }

}
