import { SocketService, RestService } from './../feathers/feathers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RXNConsoService {

  public _socket;
  private _rest;
  private listner;
  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {
    this._rest = _restService.getService('rxnconso');
    this._socket = _socketService.getService('rxnconso');
    this._socket.on('created', data => {
      console.log(data);
    });
  }

  find(query: any) {
    return this._socket.find(query);
  }
}
