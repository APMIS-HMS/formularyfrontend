import { Injectable } from '@angular/core';
import { SocketService, RestService } from '../feathers/feathers.service';

@Injectable()
export class StrengthUnitsService {
	public _socket;
	private _rest;
	private listner;
	constructor(private _socketService: SocketService, private _restService: RestService) {
		this._rest = _restService.getService('strength-units');
		this._socket = _socketService.getService('strength-units');
	}

	find(query: any) {
		return this._rest.find(query);
	}
}
