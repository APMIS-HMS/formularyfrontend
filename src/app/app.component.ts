import { ProductTypeService } from './services/product-type.service';
import { ProductService } from './services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BrandService } from './services/brand.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  brandSuggest: boolean;
  productTypes: any;
  suggest = false;
  productSuggest = false;

  brands: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private brandService: BrandService
  ) {}

  public frm_newProduct: FormGroup;
  public ingredientForm: FormGroup;
  public variantsForm: FormGroup;

  ngOnInit() {
    this.frm_newProduct = this.formBuilder.group({
      productName: ['', [<any>Validators.required]],
      productType: ['', [<any>Validators.required]],
      brand: ['', [<any>Validators.required]],
      drugForm: ['', [<any>Validators.required]],
      ingrident: ['', [<any>Validators.required]],
      route: ['', [<any>Validators.required]],
      manufacturer: ['', [<any>Validators.required]],
      frequency: ['', [<any>Validators.required]],
      unit: ['', [<any>Validators.required]]
    });

    this.ingredientForm = this.formBuilder.group({
      ingredientName: [''],
      ingredientSize: ['', [<any>Validators.required]],
      ingredientUnit: ['']
    });

    this.variantsForm = this.formBuilder.group({
      variantSize: [''],
      variantUnit: ['']
    });

    this.frm_newProduct.controls['productName'].valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        this.productService.find({ query: { search: value } }).then(payload => {
          if (payload.data.length > 1) {
            this.productSuggest = true;
          } else {
            this.productSuggest = false;
          }
        });
      });

    this.frm_newProduct.controls['brand'].valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        this.brandService
          .find({
            query: {
              search: value,
              $limit: 300
            }
          })
          .then(payload => {
            console.log(payload);
            if (payload.status === 'success' && payload.data.data.length > 1) {
              console.log(payload.data.data);
              this.brandSuggest = true;
              this.brands = payload.data.data;
            } else {
              this.brandSuggest = false;
              this.brands = [];
            }
          });
      });

    this.getProductTypes();
  }
  onProductKeydown() {
    //  return this.productSuggest;
  }

  onBrandKeydown() {

  }

  getProductTypes() {
    this.productTypeService.find({ query: {} }).then(payload => {
      this.productTypes = payload.data;
    });
  }
  onKeydown() {
    this.suggest = true;
  }
  suggestion_click() {
    this.suggest = false;
  }

  brand_suggestion_click() {
    this.brandSuggest = false;
  }
}
