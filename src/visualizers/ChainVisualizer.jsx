import { motion } from 'framer-motion'

function ChainVisualizer({ isExploring = false }) {
  const nodes = ['12', '24', '37', '51']

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.map((node, index) => (
          <div className="flex items-center gap-3" key={node}>
            <motion.div
              animate={{
                y: isExploring && index === 1 ? -10 : 0,
                boxShadow:
                  isExploring && index === 1
                    ? '0 18px 38px rgba(52, 211, 153, 0.24)'
                    : '0 10px 24px rgba(0, 0, 0, 0.18)',
              }}
              className="group relative rounded-md border border-emerald-300/30 bg-emerald-300/10 px-5 py-4 text-lg font-semibold text-white shadow-lg"
              initial={{ opacity: 0, x: -16 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              whileHover={{ scale: 1.06, rotateX: 8 }}
            >
              {node}
              <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-xs text-emerald-100 group-hover:block">
                node {index + 1}
              </span>
            </motion.div>
            {index < nodes.length - 1 && (
              <motion.span
                animate={{ opacity: isExploring ? [0.4, 1, 0.4] : 1 }}
                className="text-xl text-emerald-200"
                transition={{ duration: 1.2, repeat: isExploring ? Infinity : 0 }}
              >
                --&gt;
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-slate-400">
        Each node stores data plus a reference to the next node.
      </p>
    </div>
  )
}

export default ChainVisualizer
