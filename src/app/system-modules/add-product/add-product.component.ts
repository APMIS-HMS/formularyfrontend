import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DurationUnits } from '../../shared-modules/global-config';
import {
  BrandedProductService, ManufacturerService, IngredientService, ProductService, BrandService, ProductTypeService,
  FrequencyService, SystemModuleService
 } from '../../services/index';
import { log } from 'util';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Output() homepage: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('imageHolder') imageHolder: ElementRef;
  productTypes: any;
  suggest = false;
  searchPage = false;
  brandSuggest = false;
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
  disableBtn = false;
  saveProduct = true;
  savingProduct = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private _brandedProductService: BrandedProductService,
    private productTypeService: ProductTypeService,
    private brandService: BrandService,
    private _systemModuleService: SystemModuleService,
    private _manufacturerService: ManufacturerService,
    private _ingredientService: IngredientService,
    private _frequencyService: FrequencyService,
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
      upload: [''],
      manufacturer: ['', [<any>Validators.required]],
      regimens: this.formBuilder.array([])
    });

    this._getFrequencies();

    this.frm_newProduct.controls['brand'].valueChanges
      .pipe(tap(val => {
        // if (val.length < 3) {
        //   this.brandText = 'Character must be greater than 3';
        // }
        this.brands = []; this.bLoading = true;
      }), debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        // this.selectedBrand = undefined;
        if (!!value && value.length >= 3 && !this.isSelected) {
          this.bLoading = true;
          this.brandService.find({
            query: { search: value, $limit: 20 }
          }).then(res => {
            this.bLoading = false;
            this.isSelected = false;
            if (res.status === 'success' && !!res.data && !!res.data.data && res.data.data.length > 0) {
              this.brandSuggest = true;
              this.brands = res.data.data;
            } else {
              this.brandText = 'Search is empty';
              this.brands = [];
            }
          });
        } else {
          this.isSelected = false;
        }
      });

    this.frm_newProduct.controls['ingredient'].valueChanges
      .pipe(tap(val => {
        // if (val.length < 3) {
        //   this.ingredientText = 'Character must be greater than 3';
        // }
        this.ingredients = []; this.inLoading = true;
      }), debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        if (!!value && value.length >= 3 && !this.isSelected) {
          this._ingredientService.find({ query: { search: value, $limit: 100 }}).then(res => {
            this.inLoading = false;
            this.isSelected = false;
            if (res.status === 'success' && res.data.length > 0) {
              this.ingredientSuggest = true;
              this.ingredients = res.data;
            } else {
              this.ingredientText = 'Search is empty';
              this.ingredients = [];
            }
          });
        } else {
          this.isSelected = false;
        }
      });

    this.frm_newProduct.controls['manufacturer'].valueChanges
      .pipe(tap(val => {
        // if (val.length < 3) {
        //   this.manufacturerText = 'Character must be greater than 3';
        // }
        this.manufacturers = []; this.mLoading = true;
      }), debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        // this.selectedManufacturer = undefined;

        if (!!value && value.length >= 3 && !this.isSelected) {
          this.mLoading = true;
          this._manufacturerService.find({ query: { name: { '$regex': value, '$options': 'i' }, $limit: 20} }).then(res => {
            this.mLoading = false;
            this.isSelected = false;
            if (res.data.length > 0) {
              this.manufacturerSuggest = true;
              this.manufacturers = res.data;
            } else {
              this.manufacturerText = 'Search is empty';
              this.manufacturers = [];
            }
          });
        } else {
          this.isSelected = false;
        }
      });

    this.getProductTypes();
  }

  onClickSaveProduct(valid: boolean, value: any) {
    console.log(valid);
    console.log(value);
    if (valid) {
      if (!!this.selectedIngredient) {
        this.disableBtn = true;
        this.saveProduct = false;
        this.savingProduct = true;
        const payload = {
          PRODUCT_TYPE: value.productType.toUpperCase(),
          BN: value.brand,
          MAT: value.manufacturer,
          SCD: {
            STR: this.selectedIngredient.name,
            RXCUI: this.selectedIngredient.code
          },
          BNBase64: value.upload,
          REGIMENS: value.regimens
        };

        console.log(payload);
        // Call the API to save create-branded-products
        this._brandedProductService.create(payload).then(res => {
          console.log(res);
          if (res.status === 'success') {
            this.frm_newProduct.reset();
            this.imageHolder.nativeElement.src = 'assets/images/default.png';
            this.frm_newProduct.controls['upload'].setValue('');
            this.disableBtn = false;
            this.saveProduct = true;
            this.savingProduct = false;
            const msg = `You have successfully created ${value.brand} as a product`;
            this._systemModuleService.announceSweetProxy(msg, 'success');
          } else {
            this.disableBtn = false;
            this.saveProduct = true;
            this.savingProduct = false;
            this._systemModuleService.announceSweetProxy('You must select ingredient from the drop down', 'error');
          }
        }).catch(err => {
          console.log(err);
        });
      } else {
        this._systemModuleService.announceSweetProxy('You must select ingredient from the drop down', 'error');
      }
    } else {
      this._systemModuleService.announceSweetProxy('Some fields are missing', 'error');
    }
  }

  _initRegimen(regimen?: any) {
      return this.formBuilder.group({
        frequency: [''],
        duration: [''],
        unit: ['']
        // frequency: [!!regimen ? regimen.frequency : ''],
        // duration: [!!regimen ? regimen.duration : ''],
        // unit: [!!regimen ? regimen.unit : '']
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

  onBrandKeydown(focus) {
    if (focus === 'in') {
      this.bLoading = false;
      this.brandSuggest = true;
    } else {
      setTimeout(() => {
        this.brandSuggest = false;
      }, 300);
    }
  }

  onManfacturerKeydown(focus) {
    if (focus === 'in') {
      this.mLoading = false;
      this.manufacturerSuggest = true;
    } else {
      setTimeout(() => {
        this.manufacturerSuggest = false;
      }, 300);
    }
  }

  onIngredientKeydown(focus) {
    if (focus === 'in') {
      this.inLoading = false;
      this.ingredientSuggest = true;
    } else {
      setTimeout(() => {
        this.ingredientSuggest = false;
      }, 300);
    }
  }

  showImageBrowseDlg() {
    this.fileInput.nativeElement.click()
  }

  onChangeUpload() {
    this._systemModuleService.on();
    const input = this.fileInput.nativeElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      const that = this;
      reader.onload = function (e: any) {
        that._systemModuleService.off();
        that.imageHolder.nativeElement.src = e.target.result;
        that.frm_newProduct.controls['upload'].setValue(e.target.result);
        // that.fileInput.nativeElement.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  getProductTypes() {
    this.productTypeService.find({ query: {} }).then(payload => {
      this.productTypes = payload.data;
    });
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
