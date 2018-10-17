import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  create_prod(){
    this._router.navigate(['modules/add-product']); 
  }
  search_prod(){
    this._router.navigate(['modules/products']); 
  }
  scd_page(){
    this._router.navigate(['modules/scd-page']); 
  }
}
