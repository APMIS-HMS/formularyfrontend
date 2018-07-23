import { SocketService, RestService } from './../feathers/feathers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandService {

  public _socket;
  private _rest;
  private listner;
  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {
    this._rest = _restService.getService('search-brands');
    this._socket = _socketService.getService('search-brands');
  }

  find(query: any) {
    return this._rest.find(query);
  }
}
