import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProductTypeService } from '../../services/product-type.service';
import { BrandService } from '../../services/brand.service';
import { ProductService } from '../../services/product.service';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RXNConsoService } from '../../services/rxnconso.service';
import { IngredientService } from '../../services/ingredient.service';
import { ManufacturerService } from '../../services/manufacturer.service';
import { DurationUnits } from '../../shared-modules/global-config';
import { FrequencyService } from '../../services/frequency.service';
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
  productSuggest = false;
  ingredientSuggest = false;
  manufacturerSuggest = false;
  isSelected = false;
  selectedBrand: any;
  selectedIngredient: any;
  selectedManufacturer: any;
  brands: any[] = [];
  ingredients: any[] = [];
  manufacturers: any[] = [];
  frequencies: any[] = [];
  durationUnits: any[] = DurationUnits;
  bLoading = true;
  brandText = 'Character must be greater than 3';
  inLoading = true;
  ingredientText = 'Character must be greater than 3';
  mLoading = true;
  manufacturerText = 'Character must be greater than 3';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private brandService: BrandService,
    private _manufacturerService: ManufacturerService,
    private _ingredientService: IngredientService,
    private _frequencyService: FrequencyService,
    private _rxnConsoService: RXNConsoService,
    private _router: Router
  ) { }

  public frm_newProduct: FormGroup;
  public ingredientForm: FormGroup;
  public variantsForm: FormGroup;

  ngOnInit() {
    this.frm_newProduct = this.formBuilder.group({
      productType: ['', [<any>Validators.required]],
      brand: ['', [<any>Validators.required]],
      ingredient: ['', [<any>Validators.required]],
      upload: ['', [<any>Validators]],
      manufacturer: ['', [<any>Validators.required]],
      regimens: this.formBuilder.array([this._initRegimen()])
    });

    this._getFrequencies();

    this.frm_newProduct.controls['brand'].valueChanges
      .pipe(tap(val => {
        if (val.length < 3) {
          this.brandText = 'Character must be greater than 3';
        }
        console.log(val); this.brands = []; this.bLoading = false;
      }), debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        console.log(value);
        this.selectedBrand = undefined;
        if (value.length >= 3 && this.isSelected === false) {
          this._rxnConsoService.find({
            query: { TTY: 'BN', STR: { '$regex': value, '$options': 'i' }, $limit: 10 }
          }).then(res => {
            console.log(res);
            this.isSelected = false;
            if (res.data.length > 0) {
              this.brandSuggest = true;
              this.brands = res.data;
            } else {
              this.brandText = 'Search is empty';
              this.brandSuggest = false;
              this.brands = [];
            }
          });
        } else {
          this.isSelected = false;
        }
      });

    this.frm_newProduct.controls['ingredient'].valueChanges
      .pipe(tap(val => {
        if (val.length < 3) {
          this.ingredientText = 'Character must be greater than 3';
        }
        console.log(val); this.ingredients = []; this.inLoading = false;
      }), debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        console.log(value);
        this.selectedIngredient = undefined;
        if (value.length >= 3 && this.isSelected === false) {
          this._ingredientService.find({ query: { search: value, $limit: 20 }}).then(res => {
            console.log(res);
            this.isSelected = false;
            if (res.status === 'success' && res.data.length > 0) {
              console.log(res.data);
              this.ingredientSuggest = true;
              this.ingredients = res.data;
            } else {
              this.ingredientText = 'Search is empty';
              this.ingredientSuggest = false;
              this.ingredients = [];
            }
          });
        } else {
          this.isSelected = false;
        }
      });

    this.frm_newProduct.controls['manufacturer'].valueChanges
      .pipe(tap(val => {
        if (val.length < 3) {
          this.manufacturerText = 'Character must be greater than 3';
        }
        this.manufacturers = []; this.mLoading = false;
      }), debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        console.log(value);
        this.selectedManufacturer = undefined;
        if (value.length >= 3 && this.isSelected === false) {
          this._manufacturerService.find({ search: 'amoxi' }).then(res => {
            console.log(res);
            this.isSelected = false;
            if (res.data.length > 0) {
              console.log(res.data.data);
              this.manufacturerSuggest = true;
              this.manufacturers = res.data.data;
            } else {
              this.manufacturerText = 'Search is empty';
              this.manufacturerSuggest = false;
              this.manufacturers = [];
            }
          });
        } else {
          this.isSelected = false;
        }
      });

    this.getProductTypes();
  }

  _initRegimen(regimen?: any) {
      return this.formBuilder.group({
        frequency: [!!regimen ? regimen.frequency : '', Validators.required],
        duration: [!!regimen ? regimen.duration : '', Validators.required],
        unit: [!!regimen ? regimen.unit : '', Validators.required],
      });
  }

  addRegimen(regimen?: any) {
      (!!regimen) ? regimen = regimen : regimen = null;
      // add regimen to list
      const control = <FormArray>this.frm_newProduct.controls['regimens'];
      control.push(this._initRegimen(regimen));
  }

  removeRegimen(i: number) {
    // remove regimen from the list
    const control = <FormArray>this.frm_newProduct.controls['regimens'];
    control.removeAt(i);
  }

  _getFrequencies() {
    this._frequencyService.find({query: { $limit: 20 }}).then(res => {
      if (res.data.length > 0) {
        this.frequencies = res.data;
      }
    }).catch(err => {});
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
    this.searchPage = true;
  }

  brand_suggestion_click(value) {
    this.brandSuggest = false;
    this.isSelected = true;
    this.selectedBrand = value;
    this.frm_newProduct.controls['brand'].setValue(value.STR);
  }
  manufacturer_suggestion_click(value) {
    this.manufacturerSuggest = false;
    this.isSelected = true;
    this.selectedManufacturer = value;
    this.frm_newProduct.controls['manufacturer'].setValue(value.name);
  }

  ingreditent_suggestion_click(value) {
    this.ingredientSuggest = false;
    this.isSelected = true;
    this.selectedIngredient = value;
    this.frm_newProduct.controls['ingredient'].setValue(value.name);
  }

  prod_list() {
    this._router.navigate(['modules/products']);
  }
}
