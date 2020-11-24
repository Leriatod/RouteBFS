import { CityService } from './../city.service';
import { Component, OnInit } from '@angular/core';
import { City } from '../models/city';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities: City[];

  constructor(private _cityService: CityService) { }

  async ngOnInit(): Promise<void> {
    this.cities = await this._cityService.getAll();
    console.log(this.cities);
  }

}
