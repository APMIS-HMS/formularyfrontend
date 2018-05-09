
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BrandService } from './services/brand.service';
import { IngredientService } from './services/ingredient.service';
=======
>>>>>>> 5da520c2ddb66834b7e2feeddd27adc8ebd375a4
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
<<<<<<< HEAD
  brandSuggest: boolean;
  productTypes: any;
  suggest = false;
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
    private ingredientService: IngredientService,
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
            this.isSelected = false;
            if (payload.status === 'success' && payload.data.data.length > 0) {
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

      this.frm_newProduct.controls['ingrident'].valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        this.selectedIngredient = undefined;
        if (value.length >= 3 && this.isSelected === false) {
          this.ingredientService
          .find({
            query: {
              search: value,
              $limit: 10
            }
          })
          .then(payload => {
            this.isSelected = false;
            if (payload.status === 'success' && payload.data.length > 0) {
              this.ingredientSuggest = true;
              this.ingredients = payload.data;
            } else {
              this.ingredientSuggest = false;
              this.ingredients = [];
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
=======
>>>>>>> 5da520c2ddb66834b7e2feeddd27adc8ebd375a4

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
<<<<<<< HEAD

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
    this.frm_newProduct.controls['ingrident'].setValue(value.name);
    this._getIngredient(value.code);
  }

  _getIngredient(id) {
    this.ingredientService.get(id,{}).then(payload => {
      console.log(payload);
    });
=======
  nav_home(){
    this.homePage = true;
    this.searchPage = false; 
    this.addPage = false;
>>>>>>> 5da520c2ddb66834b7e2feeddd27adc8ebd375a4
  }
}
