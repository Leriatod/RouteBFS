import { City } from './city';

export interface Path {
    totalDistance: number,
    cities: { city: City, distance: number }[]
}