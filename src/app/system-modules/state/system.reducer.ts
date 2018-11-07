import { SystemActions, SystemActionTypes, LoadDoseFormSuccess } from './system.action';
import { SystemState } from './system.reducer';
import { StrengthUnit, DoseForm } from './../interfaces/scd';
import { SCD } from '../interfaces/scd';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface SystemState {
	enableIngredientNameEdit: boolean;
	selectedSCD: SCD;
	SCDList: SCD[];
	strengthUnits: StrengthUnit[];
	doseForms: DoseForm[];
}

export interface State extends fromRoot.State {
	systems: SystemState;
}

const initialState: SystemState = {
	enableIngredientNameEdit: false,
	selectedSCD: null,
	SCDList: [],
	strengthUnits: [],
	doseForms: []
};

const getSystemFeatureState = createFeatureSelector<SystemState>('systems');

export const getEnableIngredientNameEdit = createSelector(
	getSystemFeatureState,
	(state) => state.enableIngredientNameEdit
);

export const getSelectedSCD = createSelector(getSystemFeatureState, (state) => state.selectedSCD);

export const getStrengthUnits = createSelector(getSystemFeatureState, (state) => state.strengthUnits);

export const getDoseForms = createSelector(getSystemFeatureState, (state) => state.doseForms);

export const getSCDList = createSelector(getSystemFeatureState, (state) => state.SCDList);

export function reducer(state: SystemState = initialState, action: SystemActions): SystemState {
	switch (action.type) {
		case SystemActionTypes.ToggleEnableIngredientNameEdit:
			return {
				...state,
				enableIngredientNameEdit: action.payload
			};

		case SystemActionTypes.SetSelectedSCD:
			return {
				...state,
				selectedSCD: action.payload
			};

		case SystemActionTypes.LoadDoseFormSuccess:
			return {
				...state,
				doseForms: action.payload
			};

		default:
			return state;
	}
}
