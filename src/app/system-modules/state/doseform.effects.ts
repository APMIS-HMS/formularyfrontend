import { DoseForm } from './../interfaces/scd';
import { DoseFormsService } from './../../services/dose-forms.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as systemActions from '../../system-modules/state/system.action';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class DoseFormEffects {
	constructor(private actions: Actions, private _doseFormService: DoseFormsService) {}

	@Effect()
	loadDoseForms$ = this.actions.pipe(
		ofType(systemActions.SystemActionTypes.LoadDoseForm),
		mergeMap(
			(action: systemActions.LoadDoseForm) =>
				this._doseFormService.find({}).then((result: any) => new systemActions.LoadDoseFormSuccess(result.data))
			// .pipe(map((doseForms: DoseForm[]) => new systemActions.LoadDoseFormSuccess(doseForms)))
		)
	);
}
