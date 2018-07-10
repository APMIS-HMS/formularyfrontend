import { SocketService, RestService } from './../feathers/feathers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FrequencyService {

  public _socket;
  private _rest;
  private listner;
  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {
    this._rest = _restService.getService('frequencies');
    this._socket = _socketService.getService('frequencies');
  }

  find(query: any) {
    return this._socket.find(query);
  }
}
