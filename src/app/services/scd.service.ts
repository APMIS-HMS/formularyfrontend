import { Injectable } from '@angular/core';
import { SocketService, RestService } from '../feathers/feathers.service';

@Injectable()
export class ScdService {
	public _socket;
	private _rest;
	private listner;
	constructor(private _socketService: SocketService, private _restService: RestService) {
		this._rest = _restService.getService('create-scd');
		this._socket = _socketService.getService('create-scd');
		this._socket.on('created', function(product) {});
	}

	find(query: any) {
		return this._socket.find(query);
	}

	findAll() {
		return this._socket.find();
	}
	get(id: string, query: any) {
		return this._socket.get(id, query);
	}

	create(product: any, query) {
		return this._socket.create(product, query);
	}

	remove(id: string, query: any) {
		return this._socket.remove(id, query);
	}

	update(id: string, data: any, query: any) {
		return this._socket.update(id, data, query);
	}
}
