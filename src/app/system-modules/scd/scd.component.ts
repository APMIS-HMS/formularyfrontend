import { DoseFormsService } from './../../services/dose-forms.service';
import { element } from 'protractor';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import {
	BrandedProductService,
	ManufacturerService,
	IngredientService,
	ProductService,
	BrandService,
	ProductTypeService,
	FrequencyService,
	SystemModuleService
} from '../../services/index';

@Component({
	selector: 'app-scd',
	templateUrl: './scd.component.html',
	styleUrls: [ './scd.component.scss' ]
})
export class ScdComponent implements OnInit {
	@Output() homepage: EventEmitter<boolean> = new EventEmitter<boolean>();

	suggest = false;
	scdSuggest = false;
	isSelected = false;
	selectedSCD: any;
	SCDs: any[] = [];
	inLoading = true;
	hasIngredient = false;
	scdText = 'Character must be greater than 3';
	ingredientForm: FormGroup;
	doseForms: any;
	constructor(
		private formBuilder: FormBuilder,
		private _ingredientService: IngredientService,
		private _doseFormService: DoseFormsService,
		private _router: Router
	) {}

	public frm_newSCD: FormGroup;

	ngOnInit() {
		this.addIngredient();
		this.removeIngredient(0);
		this.frm_newSCD = this.formBuilder.group({
			scd: [ '', [ <any>Validators.required ] ]
		});

		this.frm_newSCD.controls['scd'].valueChanges
			.pipe(
				tap((val) => {
					this.SCDs = [];
					this.inLoading = true;
				}),
				debounceTime(400),
				distinctUntilChanged()
			)
			.subscribe((value) => {
				if (!!value && value.length >= 3 && !this.isSelected) {
					this._ingredientService.find({ query: { search: value, $limit: 100 } }).then((res) => {
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
		this.getDoseForms();
	}
	getDoseForms() {
		this._doseFormService.find({}).then((payload) => {
			console.log(payload);
			this.doseForms = payload.data;
		});
	}
	addIngredient() {
		this.ingredientForm = this.formBuilder.group({
			ingredients: this.formBuilder.array([
				this.formBuilder.group({
					ingName: [ '', [ <any>Validators.required ] ],
					strengths: new FormArray([ this.initStrength() ])
				})
			])
		});
	}

	initIngredient(ingredient?) {
		return new FormGroup({
			ingName: new FormControl(ingredient === undefined ? '' : ingredient.name.split(' ')[0]),
			strengths: new FormArray([ this.initStrength(ingredient.name) ])
		});
	}

	removeIngredient(i) {
		const control = <FormArray>this.ingredientForm.get('ingredients');
		control.removeAt(i);
	}

	pushIngredient(ingredient?) {
		const control = <FormArray>this.ingredientForm.get('ingredients');
		console.log(control);
		control.push(this.initIngredient(ingredient));
		// this.subscribToFormControls();
	}

	initStrength(strength?) {
		console.log(strength);
		return new FormGroup({
			numStrength: new FormControl(strength === undefined ? '' : strength.split(' ')[1]),
			unit: new FormControl('')
		});
	}

	pushStrength(j) {
		const control = <FormArray>(<FormArray>this.ingredientForm.get('ingredients')).controls[j].get('strengths');
		control.push(this.initStrength());
	}
	removeStrength(i, j) {
		const control = <FormArray>(<FormArray>this.ingredientForm.get('ingredients')).controls[i].get('strengths');
		control.removeAt(j);
	}

	getStrengths(form) {
		return form.controls.strengths.controls;
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
		console.log(this.selectedSCD);
		// this.frm_newSCD.controls['ingredient'].setValue(value.name);
		this.search_ingredient(this.selectedSCD.code, this.selectedSCD.id);
	}

	search_ingredient(code, id) {
		const control = <FormArray>this.ingredientForm.get('ingredients');
		control.controls.forEach((x, i) => this.removeIngredient(i));
		this._ingredientService.get(code, { query: { id: id } }).then((ingredients) => {
			console.log(ingredients);
			ingredients.data.ingredient_strengths.forEach((ingredient_strength) => {
				this.pushIngredient(ingredient_strength);
			});
			this.hasIngredient = true;
		});
	}

	/*   showImageBrowseDlg() {
    this.fileInput.nativeElement.click()
  } */

	sign_in() {
		this._router.navigate([ '**' ]);
	}
	onSubmit() {}
}
