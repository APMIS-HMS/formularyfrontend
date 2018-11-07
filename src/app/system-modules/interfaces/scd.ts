export interface SCD {
	id: string;
	name: string;
	code: string;
	ingredient_strengths: RxNormPart[];
	dose_form: RxNormPart[];
}

export interface RxNormPart {
	id: string;
	name: string;
	code: string;
}

export interface DoseForm {
	_id: string;
	STR: string;
}

export interface StrengthUnit {
	_id: string;
	name: string;
}
