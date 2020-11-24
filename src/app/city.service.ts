import { Edge } from './models/edge';
import { City } from './models/city';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  private _baseUrl = "http://my-json-server.typicode.com/Leriatod/FakeService/";

  constructor(private _http: HttpClient ) { }

  getCities() : Promise<City[]> {
    return this._http.get<City[]>(this._baseUrl + "cities").toPromise();
  }

  getEdges() : Promise<Edge[]> {
    return this._http.get<Edge[]>(this._baseUrl + "edges").toPromise();
  }
}
