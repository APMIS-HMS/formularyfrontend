import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

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
