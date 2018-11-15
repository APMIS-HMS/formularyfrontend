import { SocketService, RestService } from './../feathers/feathers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IngredientService {
	public _socket;
	private _rest;
	private listner;
	constructor(private _socketService: SocketService, private _restService: RestService) {
		this._rest = _restService.getService('search-ingredients');
		this._socket = _socketService.getService('search-ingredients');
		this._socket.timeout = 30000;
		this._socket.on('created', function(product) {});
	}

	find(query: any) {
		return this._socket.find(query);
	}

	findAll() {
		return this._socket.find();
	}
	get(id: string, query: any) {
		console.log(id);
		console.log(query);
		return this._socket.get(id, query);
	}

	create(product: any) {
		return this._socket.create(product);
	}

	remove(id: string, query: any) {
		return this._socket.remove(id, query);
	}
}
