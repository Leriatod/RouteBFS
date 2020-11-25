import { City } from './city';
import { Edge } from './edge';
import * as _ from 'underscore';


interface Node {
    city: City,
    parent: Node,
    distance: number
}

export class Graph {
    constructor(private edges: Edge[]) {
    }

    bestFirstSearch(from: City, to: City) {    
        var cityPriorityQueue: Node[] = [];
        cityPriorityQueue.push({ city: from, parent: null, distance: 0 });

        var visited = {};
        visited[from.id] = true;

        while (cityPriorityQueue.length !== 0) {
            var node = cityPriorityQueue.shift();
            
            if (node.city.id === to.id) {
                console.log(node);
                break;
            }

            var neightborsList = this.getNeightborsFor(node);     
            neightborsList.forEach(neightbor => {
                if (!visited[neightbor.city.id]) {
                    visited[neightbor.city.id] = true;
                    cityPriorityQueue.push(neightbor);
                }
            });

            cityPriorityQueue = _.sortBy(cityPriorityQueue, c => c.distance);
        }
    }

    private getNeightborsFor(node: Node): Node[] {
        var neightborsList: Node[] = [];

        this.edges.forEach(edge => {
            var city1 = edge.from;
            var city2 = edge.to;
            
            var neightbor: Node = { city: null, parent: node, distance: edge.distance };

            if (city1.id === node.city.id) {
                neightbor.city = city2;
                neightborsList.push(neightbor);
            } else if (city2.id === node.city.id) {
                neightbor.city = city1;
                neightborsList.push(neightbor);
            }
        });
        return neightborsList;
    }


    
}