import { SocketService, RestService } from './../feathers/feathers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  public _socket;
  private _rest;
  private listner;
  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {
    this._rest = _restService.getService('users');
    this._socket = _socketService.getService('users');
  }


  find(query: any) {
    return this._socket.find(query);
  }

  create(payload: any) {
    return this._socket.create(payload);
  }
}
