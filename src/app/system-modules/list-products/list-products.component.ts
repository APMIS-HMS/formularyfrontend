import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  searchInput = new FormControl();
  searchTypeInput = new FormControl();

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  create_prod(){
    this._router.navigate(['modules/add-product']); 
  }

}
