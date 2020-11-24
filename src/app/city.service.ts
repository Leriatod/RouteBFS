import { City } from './models/city';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  private _baseUrl = "http://my-json-server.typicode.com/Leriatod/FakeService/cities/";

  constructor(private _http: HttpClient ) { }

  getAll() : Promise<City[]> {
    return this._http.get<City[]>(this._baseUrl).toPromise();
  }
}
