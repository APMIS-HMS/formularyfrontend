import { Injectable } from '@angular/core';
import * as superagent from 'superagent';
import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client';
import * as io from 'socket.io-client';
import * as localstorage from 'feathers-localstorage';
import * as hooks from 'feathers-hooks';
import * as rest from 'feathers-rest/client';
import * as authentication from 'feathers-authentication/client';
// const rx = require('feathers-reactive');
// const RxJS = require('rxjs/Rx');

 const HOST = 'https://formularyapi.azurewebsites.net'; // Your base server URL here
//const HOST = 'http://localhost:3030'; // Your base server URL here

@Injectable()
export class RestService {
	private _app: any;
	constructor() {
		this._app = feathers() // Initialize feathers
			.configure(rest(HOST).superagent(superagent)) // Fire up rest
			.configure(hooks()); // Configure feathers-hooks
	}
	public getService(value: any) {
		return this._app.service(value);
	}
}

@Injectable()
export class SocketService {
	private _app: any;
	public socket: any;
	constructor() {
		// this.socket = io(HOST);
		// this._app = feathers()
		//   .configure(socketio(this.socket))
		//   .configure(hooks())
		this.socket = io(HOST);
		this._app = feathers().configure(socketio(this.socket)).configure(hooks());
		// .configure(rx(RxJS, { listStrategy: 'always' }))
		// .configure(authentication({ storage: window.localStorage }));
		//  this._app.on('reauthentication-error', this.errorHandler)
	}

	public getService(value: any) {
		return this._app.service(value);
	}
}
