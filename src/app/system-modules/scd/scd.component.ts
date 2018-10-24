import { StrengthUnitsService } from './../../services/strength-units.service';
import { DoseFormsService } from './../../services/dose-forms.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { IngredientService } from '../../services/index';
import { tryParse } from 'selenium-webdriver/http';

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
	strengthUnits: any;
	selectedDoseForm: any;
	nameLabel = '';
	ingredient: any;
	strengthNumericIndex = 0;
	constructor(
		private formBuilder: FormBuilder,
		private _ingredientService: IngredientService,
		private _doseFormService: DoseFormsService,
		private _strengthUnitService: StrengthUnitsService,
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
		this.getStrengthUnits();
	}

	getDoseForms() {
		this._doseFormService.find({}).then((payload) => {
			this.doseForms = payload.data;
		});
	}

	getStrengthUnits() {
		this._strengthUnitService.find({}).then((payload) => {
			this.strengthUnits = payload.data;
		});
	}

	addIngredient() {
		this.ingredientForm = this.formBuilder.group({
			ingredients: this.formBuilder.array([
				this.formBuilder.group({
					ingName: [ '', [ <any>Validators.required ] ],
					strengths: new FormArray([ this.initStrength() ])
				})
			]),
			doseForm: new FormControl('')
		});
	}
	setIngredientComponentIndexes(name) {
		const nameLists = name.split(' ');
		nameLists.forEach((n, i) => {
			const indexType = parseInt(n, 10);
			if (!isNaN(indexType)) {
				this.strengthNumericIndex = i;
			}
		});
	}

	initIngredient(ingredient?) {
		if (ingredient) {
			this.setIngredientComponentIndexes(ingredient.name);
		}

		return new FormGroup({
			ingName: new FormControl(
				ingredient === undefined
					? ''
					: ingredient.name.split(' ').filter((x, i) => i < this.strengthNumericIndex).join(' ')
			),
			strengths: new FormArray([ this.initStrength(ingredient === undefined ? '' : ingredient.name) ])
		});
	}

	removeIngredient(i) {
		const control = <FormArray>this.ingredientForm.get('ingredients');
		control.removeAt(i);
	}

	pushIngredient(ingredient?) {
		console.log('click');
		const control = <FormArray>this.ingredientForm.get('ingredients');
		control.push(this.initIngredient(ingredient));
		this.subscribToFormControls();
	}

	subscribToFormControls() {
		this.ingredientForm.valueChanges.subscribe((value) => {
			if (value !== undefined) {
				this.getName(value);
			}
		});
	}

	initStrength(strength?) {
		return new FormGroup({
			numStrength: new FormControl(strength === undefined ? '' : strength.split(' ')[this.strengthNumericIndex]),
			strengthUnit: new FormControl(
				strength === undefined ? '' : strength.split(' ')[this.strengthNumericIndex + 1]
			)
		});
	}

	pushStrength(j) {
		const control = <FormArray>(<FormArray>this.ingredientForm.get('ingredients')).controls[j].get('strengths');
		control.push(this.initStrength());
		this.subscribToFormControls();
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
		// this.frm_newSCD.controls['ingredient'].setValue(value.name);
		const control = <FormArray>this.ingredientForm.get('ingredients');
		control.controls.forEach((x, i) => this.removeIngredient(i));
		this.search_ingredient(this.selectedSCD.code, this.selectedSCD.id);
	}

	getName(ingredient) {
		this.nameLabel = '';
		if (ingredient.ingredient_strengths) {
			ingredient.ingredient_strengths.forEach((x, i) => {
				this.nameLabel = this.nameLabel + ' ' + x.name.split(' ')[0];
				this.nameLabel = this.nameLabel + ' ' + x.name.split(' ')[1];
				this.nameLabel = this.nameLabel + ' ' + x.name.split(' ')[2];
				if (i < ingredient.ingredient_strengths.length - 1) {
					this.nameLabel = this.nameLabel + ' /';
				}
			});
			ingredient.dose_form.forEach((d) => {
				this.nameLabel = this.nameLabel + ' ' + d.name;
			});
		} else {
			ingredient.ingredients.forEach((x, i) => {
				console.log(x);
				this.nameLabel = this.nameLabel + ' ' + x.ingName;
				x.strengths.forEach((s) => {
					if (s.numStrength) {
						this.nameLabel = this.nameLabel + ' ' + s.numStrength;
						this.nameLabel = this.nameLabel + ' ' + s.strengthUnit;
					}
				});
				if (i < ingredient.ingredients.length - 1) {
					this.nameLabel = this.nameLabel + ' /';
				}
			});
			this.ingredient.dose_form.forEach((d) => {
				this.nameLabel = this.nameLabel + ' ' + d.name;
			});
		}
	}
	search_ingredient(code, id) {
		const control = <FormArray>this.ingredientForm.get('ingredients');
		control.controls.forEach((x, i) => this.removeIngredient(i));
		this._ingredientService.get(code, { query: { id: id } }).then((ingredients) => {
			// this.getName(ingredients.data);
			this.ingredient = ingredients.data;
			ingredients.data.ingredient_strengths.forEach((ingredient_strength) => {
				this.pushIngredient(ingredient_strength);
			});
			const formContrl = <FormControl>this.ingredientForm.get('doseForm');
			formContrl.setValue(ingredients.data.dose_form.length === 0 ? '' : ingredients.data.dose_form[0].name);
			this.hasIngredient = true;
		});
	}

	/*   showImageBrowseDlg() {
    this.fileInput.nativeElement.click()
  } */

	sign_in() {
		this._router.navigate([ '**' ]);
	}
	onSubmit() {
		console.log(this.ingredientForm.value);
	}
}
