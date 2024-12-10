function are_isomorphic(graph1, graph2) {
    const vertices1 = Object.keys(graph1); // O(n)
    const vertices2 = Object.keys(graph2); // O(n)

    if (vertices1.length !== vertices2.length) {
        return false;
    }

    const degreeCount1 = getDegreeCount(graph1, vertices1); // O(m)
    const degreeCount2 = getDegreeCount(graph2, vertices2); // O(m)

    if (!compareFrequencyMaps(degreeCount1, degreeCount2)) { // O(k) - k = number of distinct degrees of all verticies
        return false;
    }

    return tryMapping(graph1, graph2, vertices1, vertices2, new Map(), new Set()); // O(n!)
}

function getDegreeCount(graph, vertices) {
    const degreeCount = {};
    for (const vertex of vertices) {
        const degree = graph[vertex].length;
        degreeCount[degree] = (degreeCount[degree] || 0) + 1;
    }
    return degreeCount;
}

function compareFrequencyMaps(map1, map2) {
    const keys1 = Object.keys(map1);
    const keys2 = Object.keys(map2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (map1[key] !== map2[key]) {
            return false;
        }
    }

    return true;
}

function tryMapping(graph1, graph2, vertices1, vertices2, mapping, used) {
    if (mapping.size === vertices1.length) {
        return true;
    }

    const vertex1 = vertices1[mapping.size];

    for (const vertex2 of vertices2) {
        if (
            !used.has(vertex2) &&
            graph1[vertex1].length === graph2[vertex2].length &&
            isPartialMappingValid(graph1, graph2, mapping, vertex1, vertex2)
        ) {
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
    const neighbors1 = graph1[vertex1];
    const neighbors2 = graph2[vertex2];

    const mappedNeighbors1 = neighbors1.filter(n => mapping.has(n));
    const mappedNeighbors2 = mappedNeighbors1.map(n => mapping.get(n));

    const neighborSet2 = new Set(neighbors2);
    return mappedNeighbors2.every(n => neighborSet2.has(n));
}

module.exports = { are_isomorphic };
