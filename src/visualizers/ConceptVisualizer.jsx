import ArrayVisualizer from './ArrayVisualizer'
import ChainVisualizer from './ChainVisualizer'
import GraphVisualizer from './GraphVisualizer'
import PatternVisualizer from './PatternVisualizer'
import StackQueueVisualizer from './StackQueueVisualizer'
import TreeVisualizer from './TreeVisualizer'
import VisualizationShell from './VisualizationShell'

function ConceptVisualizer({ topic }) {
  const visualMap = {
    array: <ArrayVisualizer />,
    bars: <ArrayVisualizer mode="bars" />,
    chain: <ChainVisualizer />,
    stack: <StackQueueVisualizer type="stack" />,
    queue: <StackQueueVisualizer type="queue" />,
    tree: <TreeVisualizer />,
    heap: <TreeVisualizer type="heap" />,
    trie: <TreeVisualizer type="trie" />,
    graph: <GraphVisualizer />,
    'weighted-graph': <GraphVisualizer weighted />,
    grid: <PatternVisualizer type="grid" />,
    choice: <PatternVisualizer type="choice" />,
    recursion: <PatternVisualizer type="recursion" />,
    backtracking: <PatternVisualizer type="backtracking" />,
  }

  return (
    <VisualizationShell
      subtitle="A reusable visual preview for the selected concept."
      title={topic.name}
    >
      {visualMap[topic.visualType] ?? <ArrayVisualizer />}
    </VisualizationShell>
  )
}

export default ConceptVisualizer
