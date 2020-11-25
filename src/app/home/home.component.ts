import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { City } from '../models/city';
import { Edge } from '../models/edge';
import { Graph } from '../models/graph';

import { CityService } from './../city.service';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities: City[];
  graph: Graph;

  startCity: City;
  endCity: City;

  constructor(private _cityService: CityService) { }

  async ngOnInit(): Promise<void> {
    this.cities = await this._cityService.getCities();
    
    var edges = await this._cityService.getEdges();
    this.graph = new Graph(edges);

    //console.log(this.cities);
    //console.log(edges);

  }


  formatter = (city: City) => city.name;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => this.cities.filter(city => new RegExp(term, 'mi').test(city.name)).slice(0, 10))
  )

  find() {
    this.graph.bestFirstSearch(this.startCity, this.endCity);
  }
}
