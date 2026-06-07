import { motion } from 'framer-motion'

function StackQueueVisualizer({ isExploring = false, type }) {
  const items = ['task 1', 'task 2', 'task 3', 'task 4']
  const isStack = type === 'stack'

  if (isStack) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4">
        <span className="text-sm font-semibold text-cyan-200">top</span>
        <div className="flex w-full max-w-xs flex-col-reverse gap-2">
          {items.map((item, index) => (
            <motion.div
              animate={{ x: isExploring && index === items.length - 1 ? 12 : 0 }}
              className="group relative rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg"
              initial={{ opacity: 0, y: 18 }}
              key={item}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              whileHover={{ scale: 1.03, rotateX: 6 }}
            >
              {item}
              <span className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-xs text-cyan-100 group-hover:block">
                stack item
              </span>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-400">Last in, first out.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-wrap items-center justify-center gap-3">
        <span className="text-sm font-semibold text-emerald-200">front</span>
        {items.map((item, index) => (
          <motion.div
            animate={{ y: isExploring && index === 0 ? -8 : 0 }}
            className="group relative rounded-md border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-white shadow-lg"
            initial={{ opacity: 0, x: -16 }}
            key={item}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            whileHover={{ scale: 1.05, rotateX: 6 }}
          >
            {item}
            <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-xs text-emerald-100 group-hover:block">
              queue position {index + 1}
            </span>
          </motion.div>
        ))}
        <span className="text-sm font-semibold text-emerald-200">back</span>
      </div>
      <p className="text-center text-sm text-slate-400">First in, first out.</p>
    </div>
  )
}

export default StackQueueVisualizer
