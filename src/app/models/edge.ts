import { City } from './city';

export interface Edge {
    id: number,
    from: City,
    to: City,
    distance: number
}