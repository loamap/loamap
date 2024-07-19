import linersPricing from "./assets/liners-pricing";


interface Edge {
    to: string;
    cost: number;
}

interface Graph {
    [key: string]: Edge[];
}


const graph: Graph = {};
for (const [from, destinations] of Object.entries(linersPricing)) {
    graph[from] = Object.entries(destinations).map(([to, cost]) => ({ to, cost }));
}

interface DijkstraResult {
    cost: number;
    path: string[];
}

const dijkstra = (graph: Graph, start: string, end: string): DijkstraResult => {
    const costs: { [key: string]: number } = {};
    const backtrace: { [key: string]: string | null } = {};
    const visited: { [key: string]: boolean } = {};
    const nodes = new Set<string>();

    for (let node in graph) {
        costs[node] = node === start ? 0 : Infinity;
        backtrace[node] = null;
        nodes.add(node);
    }

    while (nodes.size) {
        let minNode: string | null = null;

        nodes.forEach((node) => {
            if (minNode === null || costs[node] < costs[minNode]) {
                minNode = node;
            }
        });

        if (minNode === null) break;
        if (minNode === end) break;

        nodes.delete(minNode);
        visited[minNode] = true;

        const edges = graph[minNode];
        edges.forEach((edge) => {
            if (!visited[edge.to]) {
                const newCost = costs[minNode] + edge.cost;
                if (newCost < costs[edge.to]) {
                    costs[edge.to] = newCost;
                    backtrace[edge.to] = minNode;
                }
            }
        });
    }


    const path: string[] = [];
    let currentNode = end;
    while (currentNode) {
        path.unshift(currentNode);
        currentNode = backtrace[currentNode]!;
    }

    return {
        cost: costs[end],
        path,
    };
};

export { dijkstra, graph };
