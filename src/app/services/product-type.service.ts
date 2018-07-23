import { SocketService, RestService } from '../feathers/feathers.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductTypeService {
  public _socket;
  private _rest;
  private listner;
  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {
    this._rest = _restService.getService('product-types');
    this._socket = _socketService.getService('product-types');
    this._socket.on('created', function (product) {
      console.log(product);
    });
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

  create(product: any) {
    return this._socket.create(product);
  }

  remove(id: string, query: any) {
    return this._socket.remove(id, query);
  }

}
