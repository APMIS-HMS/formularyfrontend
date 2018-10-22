import { Injectable } from '@angular/core';
import { SocketService, RestService } from '../feathers/feathers.service';

@Injectable()
export class DoseFormsService {
	public _socket;
	private _rest;
	private listner;
	constructor(private _socketService: SocketService, private _restService: RestService) {
		this._rest = _restService.getService('dose-forms');
		this._socket = _socketService.getService('dose-forms');
	}

	find(query: any) {
		return this._rest.find(query);
	}
}
