import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services';
@Component({
	selector: 'app-list-products',
	templateUrl: './list-products.component.html',
	styleUrls: [ './list-products.component.scss' ]
})
export class ListProductsComponent implements OnInit {
	searchInput = new FormControl();
	searchTypeInput = new FormControl();
	brands: any = [];
	total = 0;
	skip = 0;
	numberOfPages = 0;
	defaultPages = [];
	limit = 5000;
	constructor(private _router: Router, private _productService: ProductService) {}

	ngOnInit() {
		this.getPaginatedProductList();
	}

	create_prod() {
		this._router.navigate([ 'modules/add-product' ]);
	}

	getCurrentPage(event) {
		this.skip = event * this.brands.limit;
		this.getPaginatedProductList();
	}
	getPaginatedProductList() {
		this._productService
			.find({
				query: {
					$select: [ 'STR', 'MAT', 'RXCUI' ],
					$skip: this.skip,
					$limit: this.limit
				}
			})
			.then((payload) => {
				this.brands = payload;
				console.log(payload);
				this.total = payload.total;
				this.skip = payload.skip;
				this.numberOfPages = Math.ceil(payload.total / payload.limit);
			});
	}
}
