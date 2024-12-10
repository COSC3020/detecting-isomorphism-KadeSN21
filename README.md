# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not.
It takes two graphs as an argument and returns `true` or `false`, depending on
whether the graphs are isomorphic or not. Your algorithm needs to handle both
the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should
avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?
The worst case  $\Theta$ time complexity of this implementation is  $\Theta(V! * V)$ where $V$ is the number of verticies in the graph. The worst case would become reality in the even that "tryMapping" itterates through all possible mappings(permutations) before finding a valid mapping between the graphs, the number of possible permutations for a graph containing $V$ verticies is $V!$, so this results in $\Theta(V!)$. In a dense graph, the number of neighbors(degree) checked by "isPartialMappingValid" for each permutation approaches the total number of verticies in the graph, resulting in the "*V" term, while this is unlikley, it is the worst case scenario. The helper function "getDegreeCount" itterages over all vertices in the passed graph, and has a worst case complexity of $\Theta(V)$($V =$ the number of vertices). "compareFrequencyMaps" itterates over the degree sequences in the passed maps and has a complexity of $\Theta(n)$ where $n$ is the number of degrees in the sequence. These helper functions are worth noting, but they are ultimatley overshadowed by the "tryMapping" function, so this algorithms worst case $\Theta$ complexity is $\Theta(V! * V)$  

Help: ChatGPT helped with testing and GitHub functionality, I referenced 22dcolli's repository to see if my algorithm was way too inefficient. 

“I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.”
