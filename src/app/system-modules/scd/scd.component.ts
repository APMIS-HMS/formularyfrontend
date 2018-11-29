import { ScdService } from './../../services/scd.service';
import { DoseForm } from './../interfaces/scd';
import { getDoseForms } from './../state/system.reducer';
import { StrengthUnitsService } from './../../services/strength-units.service';
import { DoseFormsService } from './../../services/dose-forms.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { IngredientService } from '../../services/index';
import { tryParse } from 'selenium-webdriver/http';
import { Store, select } from '@ngrx/store';
import * as fromSystem from '../state/system.reducer';
import * as systemActions from '../state/system.action';
import { SCD } from '../interfaces/scd';

@Component({
	selector: 'app-scd',
	templateUrl: './scd.component.html',
	styleUrls: [ './scd.component.scss' ]
})
export class ScdComponent implements OnInit {
	@Output() homepage: EventEmitter<boolean> = new EventEmitter<boolean>();

	labelName = false;
	showEditIngredientName = false;
	suggest = false;
	scdSuggest = false;
	inSuggest = false;
	isSelected = false;
	isIngredientSelected = false;
	selectedSCD: any;
	SCDList: any[] = [];
	// inList: any[] = [];
	inLoading = true;
	ingredientLoading = true;
	savingLoading = false;
	hasIngredient = false;
	scdText = 'Character must be greater than 3';
	inText = 'Character must be greater than 3';
	ingredientForm: FormGroup;
	doseForms: any;
	strengthUnits: any;
	selectedDoseForm: any;
	nameLabel = '';
	ingredient: any;
	strengthNumericIndex = 0;
	activeIngredientIndex = -1;
	actions = [
		{ id: 1, description: 'Modify SCD' },
		{ id: 2, description: 'SCD Plus' },
		{ id: 3, description: 'Create New SCD' },
		{ id: 4, description: 'Create Ingredient' }
	];

	selectedAction = null;
	constructor(
		private formBuilder: FormBuilder,
		private _ingredientService: IngredientService,
		private _doseFormService: DoseFormsService,
		private _strengthUnitService: StrengthUnitsService,
		private _scdService: ScdService,
		private _router: Router,
		private _store: Store<fromSystem.State>
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
					// this.SCDList = [];
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
							this.SCDList = res.data;
						} else {
							this.scdText = 'Search is empty';
							this.SCDList = [];
						}
					});
				} else {
					this.isSelected = false;
				}
			});
		// this.getDoseForms();
		this._store.dispatch(new systemActions.LoadDoseForm());
		this.getStrengthUnits();
		this.selectedAction = this.actions[0];

		this._store
			.pipe(select(fromSystem.getEnableIngredientNameEdit))
			.subscribe((enableIngredientNameEdit) => (this.showEditIngredientName = enableIngredientNameEdit));

		this._store
			.pipe(select(fromSystem.getSelectedSCD))
			.subscribe((selectedSCD) => this.performActionBaseOnSelectedSCD(selectedSCD));

		this._store
			.pipe(select(fromSystem.getDoseForms))
			.subscribe((doseForms: DoseForm[]) => (this.doseForms = doseForms));
	}

	// getDoseForms() {
	// 	this._doseFormService.find({}).then((payload) => {
	// 		this.doseForms = payload.data;
	// 	});
	// }

	clearFormArray = (formArray: FormArray) => {
		while (formArray.length !== 0) {
			formArray.removeAt(0);
		}
	};

	onSelectionChange(element) {
		this.selectedAction = element;
		const control = <FormArray>this.ingredientForm.get('ingredients');
		this.clearFormArray(control);
		this.resetSelectedSCD();
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
					strengths: new FormArray([ ...this.initStrength() ]),
					id: [ '' ],
					code: [ '' ],
					inName: [ '', [ <any>Validators.required ] ]
				})
			]),
			doseForm: new FormControl(),
			newIngredient: new FormControl()
		});
		this.subscribToFormControls();
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
			strengths: new FormArray([ ...this.initStrength(ingredient === undefined ? '' : ingredient) ]),
			id: new FormControl(ingredient === undefined || ingredient.id === undefined ? '' : ingredient.id),
			code: new FormControl(ingredient === undefined || ingredient.code === undefined ? '' : ingredient.code),
			inName: new FormControl(''),
			inList: new FormControl([]),
			existing: new FormControl(ingredient === undefined || ingredient.id === undefined ? false : true)
		});
	}

	removeIngredient(i) {
		const control = <FormArray>this.ingredientForm.get('ingredients');
		control.removeAt(i);
		if (control.length === 0) {
			this.hasIngredient = false;
		}
	}

	pushIngredient(ingredient?) {
		const control = <FormArray>this.ingredientForm.get('ingredients');

		control.push(this.initIngredient(ingredient));
		this.subscribToFormControls();
		this.hasIngredient = true;
	}

	subscribToFormControls() {
		this.ingredientForm.valueChanges.subscribe((value) => {
			if (value !== undefined) {
				this.getName(value);
			}
		});
		const formArray = (<FormArray>this.ingredientForm.get('ingredients')).controls;
		formArray.forEach((frmArray, i) => {
			(<FormGroup>frmArray).controls['inName'].valueChanges
				.pipe(
					tap((val) => {
						this.ingredientLoading = true;
					}),
					debounceTime(400),
					distinctUntilChanged()
				)
				.subscribe((value) => {
					if (
						!!value &&
						value.length >= 3 &&
						this.isIngredientSelected === false &&
						this.activeIngredientIndex > -1
					) {
						this._ingredientService
							.find({ query: { search: value, search_ingredient: true, $limit: 100 } })
							.then((res) => {
								this.ingredientLoading = false;
								this.isIngredientSelected = false;
								if (res.status === 'success' && res.data.length > 0) {
									this.inSuggest = true;
									// this.inList = res.data;
									(<FormGroup>frmArray).controls['inList'].setValue(res.data);
								} else {
									this.inText = 'Search is empty';
									// this.inList = [];
									(<FormGroup>frmArray).controls['inList'].setValue([]);
								}
							});
					} else {
						this.isIngredientSelected = false;
					}
				});
		});
	}

	initStrength(strength?) {
		const strengthList: FormGroup[] = [];
		if (strength && strength.numerator_unit && strength.denominator_unit) {
			for (let i = 0; i < 2; i++) {
				if (i === 0) {
					strengthList.push(
						new FormGroup({
							numStrength: new FormControl(
								strength === undefined || strength.name === undefined ? '' : strength.numerator_value
							),
							strengthUnit: new FormControl(
								strength === undefined || strength.name === undefined ? '' : strength.numerator_unit
							),
							id: new FormControl(strength === undefined || strength.id === undefined ? '' : strength.id)
						})
					);
				} else if (i === 1) {
					strengthList.push(
						new FormGroup({
							numStrength: new FormControl(
								strength === undefined || strength.name === undefined ? '' : strength.denominator_value
							),
							strengthUnit: new FormControl(
								strength === undefined || strength.name === undefined ? '' : strength.denominator_unit
							),
							id: new FormControl(strength === undefined || strength.id === undefined ? '' : strength.id)
						})
					);
				}
			}
		} else if (strength && strength.numerator_unit) {
			strengthList.push(
				new FormGroup({
					numStrength: new FormControl(
						strength === undefined || strength.name === undefined ? '' : strength.numerator_value
					),
					strengthUnit: new FormControl(
						strength === undefined || strength.name === undefined ? '' : strength.numerator_unit
					),
					id: new FormControl(strength === undefined || strength.id === undefined ? '' : strength.id)
				})
			);
		} else {
			strengthList.push(
				new FormGroup({
					numStrength: new FormControl(
						strength === undefined || strength.name === undefined
							? ''
							: strength.name.split(' ')[this.strengthNumericIndex]
					),
					strengthUnit: new FormControl(
						strength === undefined || strength.name === undefined
							? ''
							: strength.name.split(' ')[this.strengthNumericIndex + 1]
					),
					id: new FormControl(strength === undefined || strength.id === undefined ? '' : strength.id)
				})
			);
		}
		return strengthList;
	}

	pushStrength(j) {
		const control = <FormArray>(<FormArray>this.ingredientForm.get('ingredients')).controls[j].get('strengths');
		this.initStrength().forEach((i) => {
			control.push(i);
		});

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

	onINKeydown(focus, i) {
		this.activeIngredientIndex = i;
		if (focus === 'in') {
			this.ingredientLoading = false;
			this.inSuggest = true;
		} else {
			setTimeout(() => {
				this.inSuggest = false;
				this.activeIngredientIndex = -1;
			}, 300);
		}
	}

	performActionBaseOnSelectedSCD(selectedSCD: SCD) {
		if (selectedSCD !== null) {
			this.scdSuggest = false;
			this.isSelected = true;
			this.selectedSCD = selectedSCD;
			const control = <FormArray>this.ingredientForm.get('ingredients');
			control.controls.forEach((x, i) => this.removeIngredient(i));
			this.search_ingredient(this.selectedSCD.code, this.selectedSCD.id);
			this.frm_newSCD.controls['scd'].setValue(selectedSCD.name);
		}
	}

	scd_suggestion_click(value: SCD) {
		this.resetSelectedSCD();
		this._store.dispatch(new systemActions.SetSelectedSCD(value));
	}

	in_suggestion_click(value: any, ingredient: any) {
		this.isIngredientSelected = true;
		(<FormControl>ingredient.controls['inName']).setValue(value.name);
		(<FormControl>ingredient.controls['ingName']).setValue(value.name);
		(<FormControl>ingredient.controls['code']).setValue(value.code);
		(<FormControl>ingredient.controls['id']).setValue(value.id);
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
				this.nameLabel = this.nameLabel + ' ' + x.ingName;
				x.strengths.forEach((s, j) => {
					if (s.numStrength) {
						if (j === 0) {
							this.nameLabel = this.nameLabel + ' ' + s.numStrength;
							this.nameLabel = this.nameLabel + ' ' + s.strengthUnit;
						} else {
							this.nameLabel = this.nameLabel + '' + s.numStrength;
							this.nameLabel = this.nameLabel + ' ' + s.strengthUnit;
						}
					}
					if (j < x.strengths.length - 1) {
						this.nameLabel = this.nameLabel + '/';
					}
				});
				if (i < ingredient.ingredients.length - 1) {
					this.nameLabel = this.nameLabel + ' /';
				}
			});
			if (ingredient !== undefined) {
				if (ingredient.doseForm !== undefined && ingredient.doseForm !== null) {
					this.nameLabel = this.nameLabel + ' ' + ingredient.doseForm.name;
				} else {
					// this.ingredient.dose_form.forEach((d) => {
					// 	this.nameLabel = this.nameLabel + ' ' + d.name;
					// });
				}
			}
		}
	}
	search_ingredient(code, id) {
		this.savingLoading = true;
		const control = <FormArray>this.ingredientForm.get('ingredients');
		control.controls.forEach((x, i) => this.removeIngredient(i));
		this._ingredientService.get(code, { query: { id: id, sab: this.selectedSCD.sab } }).then((ingredients) => {
			this.ingredient = ingredients.data;
			ingredients.data.ingredient_strengths.forEach((ingredient_strength) => {
				this.pushIngredient(ingredient_strength);
			});
			this.savingLoading = false;
			const formContrl = <FormControl>this.ingredientForm.get('doseForm');
			formContrl.setValue(ingredients.data.dose_form.length === 0 ? '' : ingredients.data.dose_form[0]);
			this.hasIngredient = true;
		});
	}

	/*   showImageBrowseDlg() {
    this.fileInput.nativeElement.click()
  } */

	sign_in() {
		this._router.navigate([ '**' ]);
	}
	resetSelectedSCD() {
		try {
			this._store.dispatch(new systemActions.SetSelectedSCD(null));
			this.selectedSCD = undefined;
			// this.ingredientForm.reset();
			const formContrl = <FormControl>this.ingredientForm.get('doseForm');
			formContrl.setValue('');
			this.nameLabel = '';
			const control = <FormArray>this.ingredientForm.get('ingredients');
			this.clearFormArray(control);
		} catch (error) {
			console.log(error);
		}
	}
	onSubmit() {
		this.savingLoading = true;
		if (this.selectedAction.id === 1) {
			const payload = {
				id: this.selectedSCD.id,
				ingredients: this.ingredientForm.value
			};
			this._scdService.update(this.selectedSCD.id, payload, { query: { nameLabel: this.nameLabel } }).then(
				(pay) => {
					this.resetSelectedSCD();
					this.savingLoading = false;
				},
				(error) => {
					this.savingLoading = false;
				}
			);
		} else if (this.selectedAction.id === 2) {
			const primaryIngredients = [];
			const otherIngredients = [];
			const payload = {
				id: this.selectedSCD.id,
				ingredients: this.ingredientForm.value
			};
			this.ingredientForm.value.ingredients.forEach((element, i) => {
				if (element.existing === true) {
					primaryIngredients.push(element);
					element.inList = [];
				} else {
					otherIngredients.push(element);
					element.inList = [];
				}
			});
			this._scdService.update(this.selectedSCD.id, payload, { query: { nameLabel: this.nameLabel } }).then(
				(pay) => {
					this.resetSelectedSCD();
					this.savingLoading = false;
				},
				(error) => {
					this.savingLoading = false;
				}
			);
		} else if (this.selectedAction.id === 3) {
			this._scdService.create(this.ingredientForm.value, { query: { nameLabel: this.nameLabel } }).then(
				(pay) => {
					this.resetSelectedSCD();
					this.savingLoading = false;
				},
				(error) => {
					this.savingLoading = false;
				}
			);
		} else if (this.selectedAction.id === 4) {
			this._scdService.create({ name: this.ingredientForm.value.newIngredient }, {}).then(
				(pay) => {
					this.resetSelectedSCD();
					this.savingLoading = false;
				},
				(error) => {
					console.log(error);
					this.savingLoading = false;
				}
			);
		}
	}

	checkChanged(checked) {
		this._store.dispatch(new systemActions.ToggleEnableIngredientNameEdit(checked));
		this.labelName = !this.labelName;
	}

	compareFn(optionOne, optionTwo): boolean {
		if (optionOne !== null && optionTwo !== null) {
			return optionOne.name === optionTwo.name;
		} else {
			return false;
		}
	}
}
