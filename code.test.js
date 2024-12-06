// Import the function that checks for graph isomorphism
const {are_isomorphic, Graph} = require('./code.js'); // Replace with the actual path to your function
function runTest(testName, actual, expected) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`✅ ${testName}: Passed`);
    } else {
        console.error(`❌ ${testName}: Failed`);
        console.error(` Expected: ${JSON.stringify(expected)}`);
        console.error(` Got: ${JSON.stringify(actual)}`);
    }
}

console.log("Running static tests...\n");

// Test 1: Simple isomorphic graphs
runTest(
    "Test 1: Simple isomorphic graphs",
    are_isomorphic(new Graph({
            0: [1, 2],
            1: [0, 2],
            2: [0, 1]
        }),
        new Graph({
            0: [1, 2],
            1: [0, 2],
            2: [0, 1]
        })
    ),
    true
);

// Test 2: Isomorphic with different labeling
runTest(
    "Test 2: Isomorphic with different labeling",
    are_isomorphic(new Graph({
            0: [1, 2],
            1: [0, 3],
            2: [0, 3],
            3: [1, 2],
            }), 
        new Graph({
            a: ["b", "c"],
            b: ["a", "d"],
            c: ["a", "d"],
            d: ["b", "c"]
            })
        ),
    true
);

// Test 3: Non-isomorphic (different number of nodes)
runTest(
    "Test 3: Non-isomorphic (different number of nodes)",
    are_isomorphic(
        new Graph({
            0: [1],
            1: [0]
        }),
        new Graph({
            0: [1, 2],
            1: [0],
            2: [0]
        })
    ),
    false
);

// Test 4: Non-isomorphic (different connectivity)
runTest(
    "Test 4: Non-isomorphic (different connectivity)",
    are_isomorphic(
        new Graph({
            0: [1, 2],
            1: [0, 2],
            2: [0, 1]
        }),
        new Graph({
            0: [1, 2],
            1: [0],
            2: [0]
        })
    ),
    false
);

// Test 5: Empty graphs
runTest(
    "Test 5: Empty graphs",
    are_isomorphic(new Graph({}), new Graph({})),
    true
);

// Test 6: Single node graphs
runTest(
    "Test 6: Single node graphs",
    are_isomorphic(
        new Graph({ 0: [] }),
        new Graph({ a: [] })
    ),
    true
);

// Test 7: One graph empty, one not
runTest(
    "Test 7: One graph empty, one not",
    are_isomorphic(
        new Graph({}),
        new Graph({ 0: [1], 1: [0] })
    ),
    false
);

console.log("\nAll tests completed.");