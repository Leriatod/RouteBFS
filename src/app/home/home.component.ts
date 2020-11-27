import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { City } from '../models/city';
import { Graph } from '../models/graph';
import { Path } from '../models/path';
import { CityService } from './../city.service';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities: City[];
  startCity: City;
  endCity: City;
  
  graph: Graph;
  optimalCitiesPath: Path = { totalDistance: 0, cities: [] };

  constructor(private _cityService: CityService) { }

  async ngOnInit(): Promise<void> {
    this.cities = await this._cityService.getCities();
    
    var edges = await this._cityService.getEdges();
    this.graph = new Graph(edges);

  }

  find() {
    this.optimalCitiesPath = this.graph.bestFirstSearch(this.startCity, this.endCity);
  }

  formatter = (city: City) => city.name;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => this.cities.filter(city => new RegExp(term, 'mi').test(city.name)).slice(0, 10))
  )
}
