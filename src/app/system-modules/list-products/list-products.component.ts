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

	constructor(private _router: Router, private _productService: ProductService) {}

	ngOnInit() {
		this._productService
			.find({
				query: {
					$select: [ 'STR', 'MAT', 'RXCUI' ]
				}
			})
			.then((payload) => {
				this.brands = payload;
				console.log(payload);
			});
	}

	create_prod() {
		this._router.navigate([ 'modules/add-product' ]);
	}
}
