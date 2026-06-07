import { motion } from 'framer-motion'

function PatternVisualizer({ isExploring = false, type }) {
  const labels = {
    grid: ['state', 'memo', 'reuse', 'answer'],
    choice: ['sort', 'choose', 'lock', 'repeat'],
    recursion: ['call', 'smaller call', 'base case', 'return'],
    backtracking: ['choose', 'explore', 'reject', 'undo'],
  }

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4">
      <div className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
        {(labels[type] ?? labels.choice).map((label, index) => (
          <motion.div
            animate={{
              y: isExploring && index === 1 ? -10 : 0,
              boxShadow:
                isExploring && index === 1
                  ? '0 18px 40px rgba(34, 211, 238, 0.24)'
                  : '0 10px 24px rgba(0, 0, 0, 0.18)',
            }}
            className="group relative rounded-md border border-cyan-300/30 bg-cyan-300/10 p-4 text-center shadow-lg"
            initial={{ opacity: 0, y: 16 }}
            key={label}
            transition={{ delay: index * 0.07, duration: 0.35 }}
            whileHover={{ scale: 1.05, rotateX: 8 }}
          >
            <span className="block text-xs text-slate-400">step {index + 1}</span>
            <span className="mt-2 block text-sm font-semibold text-white">
              {label}
            </span>
            <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-xs text-cyan-100 group-hover:block">
              {type} step
            </span>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-sm text-slate-400">
        Pattern visualizations emphasize the decision flow behind the technique.
      </p>
    </div>
  )
}

export default PatternVisualizer
