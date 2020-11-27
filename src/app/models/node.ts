import { Path } from './path';
import { City } from './city';


export class Node {
    constructor(public city: City, 
                public parent: Node, 
                public distance: number) {
    }

    get cityPathFromRootToThis(): Path {
        var cityPath: Path = { totalDistance: 0, cities: [] };
        var node: Node = this;
        while(node != null) { 
            // insert at the begining
            cityPath.cities.splice(0, 0, { city: node.city, distance: node.distance }); 
            cityPath.totalDistance += node.distance;
            node = node.parent;
        }
        return cityPath;
    }
}