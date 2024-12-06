class Graph {
    constructor(adjacencyList) {
        this.adjacencyList = Object.fromEntries(
            Object.entries(adjacencyList).map(([vertex, neighbors]) => [
                String(vertex),
                neighbors.map(String)
            ])
        );
    }
    
    getVertices() {
        return Object.keys(this.adjacencyList);
    }
    
    getDegree(vertex) {
        return this.adjacencyList[String(vertex)].length;
    }
    
    getNeighbors(vertex) {
        return this.adjacencyList[String(vertex)] || [];
    }
}

function are_isomorphic(graph1, graph2) {
    const vertices1 = graph1.getVertices();
    const vertices2 = graph2.getVertices();

    if (vertices1.length !== vertices2.length) {
        return false;
    }

    const degrees1 = vertices1.map(v => graph1.getDegree(v)).sort((a, b) => b - a);
    const degrees2 = vertices2.map(v => graph2.getDegree(v)).sort((a, b) => b - a);

    if (!degrees1.every((deg, i) => deg === degrees2[i])) {
        return false;
    }

    vertices1.sort((a, b) => graph1.getDegree(b) - graph1.getDegree(a));
    vertices2.sort((a, b) => graph2.getDegree(b) - graph2.getDegree(a));

    return tryMapping(graph1, graph2, vertices1, vertices2, new Map(), new Set());
}

function tryMapping(graph1, graph2, vertices1, vertices2, mapping, used) {
    if (mapping.size === vertices1.length) {
        return isValidMapping(graph1, graph2, mapping);
    }

    const vertex1 = vertices1[mapping.size];

    for (const vertex2 of vertices2) {
        if (!used.has(vertex2) && 
            graph1.getDegree(vertex1) === graph2.getDegree(vertex2) &&
            isPartialMappingValid(graph1, graph2, mapping, vertex1, vertex2)) {
            
            mapping.set(vertex1, vertex2);
            used.add(vertex2);
            
            if (tryMapping(graph1, graph2, vertices1, vertices2, mapping, used)) {
                return true;
            }
            
            mapping.delete(vertex1);
            used.delete(vertex2);
        }
    }
    return false;
}

function isPartialMappingValid(graph1, graph2, mapping, vertex1, vertex2) {
    const neighbors1 = graph1.getNeighbors(vertex1);
    const neighbors2 = graph2.getNeighbors(vertex2);
    
    const mappedNeighbors1 = neighbors1.filter(n => mapping.has(n));
    const mappedNeighbors2 = mappedNeighbors1.map(n => mapping.get(n));
    
    return mappedNeighbors2.every(n => neighbors2.includes(n));
}

function isValidMapping(graph1, graph2, mapping) {
    for (const [v1] of mapping) {
        const neighbors1 = graph1.getNeighbors(v1);
        const neighbors2 = graph2.getNeighbors(mapping.get(v1));
        
        if (neighbors1.length !== neighbors2.length) {
            return false;
        }
        
        for (const neighbor1 of neighbors1) {
            const mappedNeighbor = mapping.get(neighbor1);
            if (!neighbors2.includes(mappedNeighbor)) {
                return false;
            }
        }
    }
    return true;
}

module.exports = {are_isomorphic, Graph}