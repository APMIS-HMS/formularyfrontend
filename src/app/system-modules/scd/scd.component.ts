import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {
  BrandedProductService, ManufacturerService, IngredientService, ProductService, BrandService, ProductTypeService,
  FrequencyService, SystemModuleService
} from '../../services/index';


@Component({
  selector: 'app-scd',
  templateUrl: './scd.component.html',
  styleUrls: ['./scd.component.scss']
})
export class ScdComponent implements OnInit {
  @Output() homepage: EventEmitter<boolean> = new EventEmitter<boolean>();

  suggest = false;
  scdSuggest = false;
  isSelected = false;
  selectedSCD: any;
  SCDs: any[] = [];
  inLoading = true;
  scdText = 'Character must be greater than 3';

  constructor(
    private formBuilder: FormBuilder,
    private _ingredientService: IngredientService,
    private _router: Router
  ) { }

  public frm_newSCD: FormGroup;

  ngOnInit() {
    this.frm_newSCD = this.formBuilder.group({
      scd: ['', [<any>Validators.required]]
    });

    this.frm_newSCD.controls['scd'].valueChanges
    .pipe(tap(val => {
      this.SCDs = []; this.inLoading = true;
    }), debounceTime(400), distinctUntilChanged())
    .subscribe(value => {
      if (!!value && value.length >= 3 && !this.isSelected) {
        this._ingredientService.find({ query: { search: value, $limit: 100 }}).then(res => {
          this.inLoading = false;
          this.isSelected = false;
          if (res.status === 'success' && res.data.length > 0) {
            this.scdSuggest = true;
            this.SCDs = res.data;
          } else {
            this.scdText = 'Search is empty';
            this.SCDs = [];
          }
        });
      } else {
        this.isSelected = false;
      }
    });

  }


  onSCDKeydown(focus) {
    if (focus === 'in') {
      this.inLoading = false;
      this.scdSuggest = true;
    } else {
      setTimeout(() => {
        this.scdSuggest = false;
      }, 300);
    }
  }

  scd_suggestion_click(value) {
    this.scdSuggest = false;
    this.isSelected = true;
    this.selectedSCD = value;
    this.frm_newSCD.controls['ingredient'].setValue(value.name);
  }

/*   showImageBrowseDlg() {
    this.fileInput.nativeElement.click()
  } */

  sign_in() {
    this._router.navigate(['**']);
  }
}
