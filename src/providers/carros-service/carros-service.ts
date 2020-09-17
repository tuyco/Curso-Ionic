import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro } from '../../models/carro-models';

@Injectable()
export class CarrosServiceProvider {

  constructor(private _http: HttpClient) {
  }

  lista() {
    return  this._http.get<Carro[]>('http://192.168.1.130:8181/api/carro/listatodos');
  }

}
