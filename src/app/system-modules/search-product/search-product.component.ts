import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  @Output() homepage: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchInput = new FormControl();
  searchTypeInput = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  home_onClick() {
    this.homepage.emit(true);
  }


}
