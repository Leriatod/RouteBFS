import { City } from './city';
import { Edge } from './edge';
import { Node } from './node'

import * as _ from 'underscore';
import { Path } from './path';


export class Graph {
    constructor(private edges: Edge[]) {
    }

    bestFirstSearch(from: City, to: City): Path { 
        var nodesOrderedByDistance = [ new Node(from, null, 0) ];   
        var isCityVisitedById = new Map<number, boolean>();

        while (nodesOrderedByDistance.length !== 0) {
            var node = nodesOrderedByDistance.shift();

            isCityVisitedById.set(node.city.id, true);

            if (node.city.id === to.id) return node.cityPathFromRootToThis;

            var nonVisitedNeightbors = this.getNonVisitedNeightborsFor(node, isCityVisitedById);
            nodesOrderedByDistance.push(... nonVisitedNeightbors);
 
            nodesOrderedByDistance = _.sortBy(nodesOrderedByDistance, c => c.distance);
        }       
        return null;
    }

    private getNonVisitedNeightborsFor(node: Node, isCityVisitedById: Map<number, boolean>): Node[] {
        var nonVisitedNeightbors: Node[] = [];

        this.edges.forEach(edge => { 
            var city1 = edge.from;
            var city2 = edge.to;

            var isSecondCityNeightbor = city1.id === node.city.id;
            var isFirstCityNeightbor  = city2.id === node.city.id;

            if (!isSecondCityNeightbor && !isFirstCityNeightbor) return;

            var neightbor = new Node(
                isFirstCityNeightbor ? city1 : city2, 
                node, 
                edge.distance
            );

            if ( isCityVisitedById.get(neightbor.city.id) ) return;

            nonVisitedNeightbors.push(neightbor);
        });
        return nonVisitedNeightbors;
    }

}