import { motion } from 'framer-motion'

const nodes = [
  { id: 'A', x: 18, y: 28 },
  { id: 'B', x: 45, y: 16 },
  { id: 'C', x: 72, y: 32 },
  { id: 'D', x: 35, y: 68 },
  { id: 'E', x: 66, y: 72 },
]

const edges = [
  ['A', 'B', 4],
  ['B', 'C', 2],
  ['A', 'D', 7],
  ['D', 'E', 1],
  ['C', 'E', 3],
]

const nodeLookup = new Map(nodes.map((node) => [node.id, node]))

function GraphVisualizer({ isExploring = false, weighted = false }) {
  return (
    <div className="relative min-h-64 overflow-hidden rounded-md">
      <svg className="absolute inset-0 h-full w-full" role="presentation">
        {edges.map(([from, to, weight]) => {
          const start = nodeLookup.get(from)
          const end = nodeLookup.get(to)

          if (!start || !end) {
            return null
          }

          return (
            <g key={`${from}-${to}`}>
              <motion.line
                animate={{
                  opacity: isExploring && from === 'A' ? [0.35, 1, 0.35] : 0.55,
                }}
                stroke="rgba(125, 211, 252, 0.32)"
                strokeWidth="2"
                transition={{
                  duration: 1.1,
                  repeat: isExploring && from === 'A' ? Infinity : 0,
                }}
                x1={`${start.x}%`}
                x2={`${end.x}%`}
                y1={`${start.y}%`}
                y2={`${end.y}%`}
              />
              {weighted && (
                <text
                  fill="rgb(186, 230, 253)"
                  fontSize="12"
                  x={`${(start.x + end.x) / 2}%`}
                  y={`${(start.y + end.y) / 2}%`}
                >
                  {weight}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      {nodes.map((node, index) => (
        <motion.div
          animate={{
            y: isExploring && node.id === 'A' ? -8 : 0,
            boxShadow:
              isExploring && node.id === 'A'
                ? '0 18px 40px rgba(34, 211, 238, 0.3)'
                : '0 10px 24px rgba(0, 0, 0, 0.24)',
          }}
          className="group absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-[#111a2d] text-sm font-semibold text-white shadow-lg"
          initial={{ opacity: 0, scale: 0.75 }}
          key={node.id}
          transition={{ delay: index * 0.06, duration: 0.35 }}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          whileHover={{ scale: 1.12, rotateX: 10 }}
        >
          {node.id}
          <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-xs text-cyan-100 group-hover:block">
            node {node.id}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default GraphVisualizer
