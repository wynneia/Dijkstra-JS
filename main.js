class Graph {
	constructor() {
	  this.nodes = new Set();
	  this.edges = new Map();
	}
  
	addNode(name) {
	  this.nodes.add(name);
	  if (!this.edges.has(name)) {
		this.edges.set(name, new Map());
	  }
	}
  
	addEdge(fromNode, toNode, weight) {
	  if (!this.edges.has(fromNode)) {
		this.edges.set(fromNode, new Map());
	  }
	  this.edges.get(fromNode).set(toNode, weight);
	}
  
	dijkstra(startNode) {
	  const distances = new Map();
	  const previous = new Map();
	  const unvisited = new Set(this.nodes);
  
	  for (let node of this.nodes) {
		distances.set(node, Infinity);
		previous.set(node, null);
	  }
  
	  distances.set(startNode, 0);
  
	  while (unvisited.size > 0) {
		let current = null;
  
		for (let node of unvisited) {
		  if (current === null || distances.get(node) < distances.get(current)) {
			current = node;
		  }
		}
  
		unvisited.delete(current);
  
		if (distances.get(current) === Infinity) {
		  break;
		}
  
		const neighbors = this.edges.get(current) || new Map();
		for (let [neighbor, weight] of neighbors) {
		  const alt = distances.get(current) + weight;
		  if (alt < distances.get(neighbor)) {
			distances.set(neighbor, alt);
			previous.set(neighbor, current);
		  }
		}
	  }
  
	  return { distances, previous };
	}
  }
  
  const graph = new Graph();
  
  graph.addNode('A');
  graph.addNode('B');
  graph.addNode('C');
  graph.addNode('D');
  graph.addNode('E');
  
  graph.addEdge('A', 'B', 4);
  graph.addEdge('A', 'C', 2);
  graph.addEdge('B', 'C', 5);
  graph.addEdge('B', 'D', 10);
  graph.addEdge('C', 'D', 3);
  graph.addEdge('C', 'E', 8);
  graph.addEdge('D', 'E', 7);
  
  const startNode = 'A';
  const { distances, previous } = graph.dijkstra(startNode);
  
  console.log(`Shortest distances from ${startNode}:`);
  for (let [node, distance] of distances) {
	console.log(`${node}: ${distance}`);
  }
  
  console.log("\nShortest paths:");
  for (let [node, prevNode] of previous) {
	let path = [];
	while (prevNode) {
	  path.unshift(prevNode);
	  prevNode = previous.get(prevNode);
	}
	console.log(`${startNode} -> ${node}: ${path.join(' -> ')}`);
  }
