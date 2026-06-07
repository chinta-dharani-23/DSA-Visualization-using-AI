const structureVisualTypes = {
  array: 'array',
  string: 'array',
  'linked-list': 'chain',
  stack: 'stack',
  queue: 'queue',
  tree: 'tree',
  bst: 'tree',
  avl: 'tree',
  heap: 'heap',
  trie: 'trie',
  graph: 'graph',
}

const algorithmVisualTypes = {
  bfs: 'graph',
  dfs: 'graph',
  dijkstra: 'weighted-graph',
  'merge-sort': 'bars',
  'quick-sort': 'bars',
  'insertion-sort': 'bars',
  'binary-search': 'array',
  recursion: 'recursion',
  backtracking: 'backtracking',
  'dynamic-programming': 'grid',
  greedy: 'choice',
}

function titleCase(value) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function resolveVisualizationTopic(instruction) {
  const algorithm = instruction?.algorithm
  const structure = instruction?.structure
  const operation = instruction?.operation
  const visualType =
    algorithmVisualTypes[algorithm] ?? structureVisualTypes[structure] ?? 'array'
  const nameSource =
    algorithm && algorithm !== 'none'
      ? algorithm
      : structure && structure !== 'unknown'
        ? structure
        : operation

  return {
    id: nameSource ?? 'generated-visualization',
    name: titleCase(nameSource ?? 'Generated Visualization'),
    visualType,
  }
}
