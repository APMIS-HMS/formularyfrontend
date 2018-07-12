import { SocketService, RestService } from './../feathers/feathers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandedProductService {

  public _socket;
  private _rest;
  private listner;
  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {
    this._rest = _restService.getService('create-branded-products');
    this._socket = _socketService.getService('create-branded-products');
  }

  create(query: any) {
    return this._socket.create(query);
  }
}
