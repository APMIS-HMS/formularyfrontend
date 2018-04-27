
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  homePage = true;
  searchPage = false;
  addPage = false;
  
  constructor() {}

  ngOnInit() {}

  nav_search(){
    this.homePage = false;
    this.searchPage = true;
    this.addPage = false;
  }
  nav_add(){
    this.homePage = false;
    this.searchPage = false;
    this.addPage = true;
  }
  nav_home(){
    this.homePage = true;
    this.searchPage = false; 
    this.addPage = false;
  }
}
