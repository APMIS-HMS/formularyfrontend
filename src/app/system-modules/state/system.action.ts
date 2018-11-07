import { SCD, DoseForm } from './../interfaces/scd';
import { Action } from '@ngrx/store';

export enum SystemActionTypes {
	ToggleEnableIngredientNameEdit = '[System] Toggle Enable Ingredient Name Edit',
	SetSelectedSCD = '[System] Set Selected SCD',
	InitializeSelectedSCD = '[System] Initialize Selected System',
	LoadDoseForm = '[System] Load DoseForm',
	LoadDoseFormSuccess = '[System] Load DoseForm Successfully',
	LoadDoseFormFail = '[System] Load DoseForm with error'
}

export class ToggleEnableIngredientNameEdit implements Action {
	readonly type = SystemActionTypes.ToggleEnableIngredientNameEdit;

	constructor(public payload: boolean) {}
}

export class SetSelectedSCD implements Action {
	readonly type = SystemActionTypes.SetSelectedSCD;

	constructor(public payload: SCD) {}
}

export class InitializeSelectedSCD implements Action {
	readonly type = SystemActionTypes.InitializeSelectedSCD;
}

export class LoadDoseForm implements Action {
	readonly type = SystemActionTypes.LoadDoseForm;
}

export class LoadDoseFormSuccess implements Action {
	readonly type = SystemActionTypes.LoadDoseFormSuccess;

	constructor(public payload: DoseForm[]) {}
}

export class LoadDoseFormFail implements Action {
	readonly type = SystemActionTypes.LoadDoseFormFail;

	constructor(public payload: string) {}
}
export type SystemActions =
	| ToggleEnableIngredientNameEdit
	| SetSelectedSCD
	| InitializeSelectedSCD
	| LoadDoseForm
	| LoadDoseFormSuccess
	| LoadDoseFormFail;
