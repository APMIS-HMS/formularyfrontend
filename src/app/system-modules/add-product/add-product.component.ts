import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProductTypeService } from '../../services/product-type.service';
import { BrandService } from '../../services/brand.service';
import { ProductService } from '../../services/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Output() homepage: EventEmitter<boolean> = new EventEmitter<boolean>();
  brandSuggest: boolean;
  productTypes: any;
  suggest = false;
  searchPage = false;
  homePage = true;
  productSuggest = false;
  drugFormSuggest = false;
  ingredientSuggest = false;
  isSelected = false;
  selectedBrand: any;
  selectedDrugForm: any;
  selectedIngredient: any;
  brands: any[] = [];
  drugForms: any[] = [];
  ingredients: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private brandService: BrandService,
    private _router: Router
  ) { }

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
      upload: ['', [<any>Validators]],
      manufacturer: ['', [<any>Validators.required]],
      regFrequency: ['', [<any>Validators.required]],
      durationUnit: ['', [<any>Validators.required]],
      regUnit: ['', [<any>Validators.required]],
      regDuration: ['', [<any>Validators.required]],
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
          console.log(payload);
          if (payload.data.length > 0) {
            this.productSuggest = true;
          } else {
            this.productSuggest = false;
          }
        });
      });

    this.frm_newProduct.controls['brand'].valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        this.selectedBrand = undefined;
        if (value.length >= 3 && this.isSelected === false) {
          this.brandService
            .find({
              query: {
                search: value,
                $limit: 10
              }
            })
            .then(payload => {
              console.log(payload);
              this.isSelected = false;
              if (payload.status === 'success' && payload.data.data.length > 0) {
                console.log(payload.data.data);
                this.brandSuggest = true;
                this.brands = payload.data.data;
              } else {
                this.brandSuggest = false;
                this.brands = [];
              }
            });
        } else {
          this.isSelected = false;
        }
      });

    this.getProductTypes();
  }

  onProductKeydown() {
    //  return this.productSuggest;
  }

  onBrandKeydown() {
    this.brandSuggest = true;
  }
  onDrugFormKeydown() {

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
  nav_search() {
    this.homePage = false;
    this.searchPage = true;
  }

  brand_suggestion_click(value) {
    this.brandSuggest = false;
    this.isSelected = true;
    this.selectedBrand = value;
    this.frm_newProduct.controls['brand'].setValue(value.STR);
  }
  drugForm_suggestion_click(value) {
    this.drugFormSuggest = false;
    this.isSelected = true;
    this.selectedDrugForm = value;
    this.frm_newProduct.controls['drugForm'].setValue(value.STR);
  }

  ingreditent_suggestion_click(value) {
    this.ingredientSuggest = false;
    this.isSelected = true;
    this.selectedIngredient = value;
    this.frm_newProduct.controls['ingrident'].setValue(value.STR);
  }

  prod_list(){
    this._router.navigate(['modules/products']);
  }
}
