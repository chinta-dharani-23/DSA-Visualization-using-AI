import { motion } from 'framer-motion'

function HoverLabel({ children, label }) {
  return (
    <motion.div className="group relative" whileHover={{ y: -8, rotateX: 8 }}>
      {children}
      <span className="pointer-events-none absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-xs text-cyan-100 shadow-xl group-hover:block">
        {label}
      </span>
    </motion.div>
  )
}

function ArrayVisualizer({ isExploring = false, mode = 'array' }) {
  const values = mode === 'bars' ? [42, 18, 64, 31, 77, 25] : ['A', 'I', 'D', 'S', 'A']

  if (mode === 'bars') {
    return (
      <div className="flex h-64 items-end justify-center gap-3">
        {values.map((value, index) => (
          <HoverLabel key={value} label={`value ${value}, index ${index}`}>
            <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{
                boxShadow:
                  isExploring && index % 2 === 0
                    ? '0 18px 40px rgba(212, 170, 45, 0.25)'
                    : '0 10px 24px rgba(178, 8, 70, 0.14)',
              }}
              className="w-10 rounded-t-md bg-gradient-to-t from-cyan-500 to-emerald-300 shadow-lg"
              initial={{ height: 0, opacity: 0 }}
              style={{ height: `${value * 2}px` }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
            />
            <span className="text-xs text-slate-400">{index}</span>
            </div>
          </HoverLabel>
        ))}
      </div>
    )
  }

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {values.map((value, index) => (
          <HoverLabel key={`${value}-${index}`} label={`index ${index}`}>
            <motion.div
              animate={{
                y: isExploring && index === 2 ? -10 : 0,
                boxShadow:
                  isExploring && index === 2
                    ? '0 20px 40px rgba(34, 211, 238, 0.25)'
                    : '0 12px 24px rgba(0, 0, 0, 0.2)',
              }}
              className="flex h-16 w-16 flex-col items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-300/10 shadow-lg backdrop-blur"
              initial={{ opacity: 0, rotateX: -20, y: 16 }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              whileHover={{ scale: 1.06 }}
            >
              <span className="text-lg font-semibold text-white">{value}</span>
              <span className="text-xs text-slate-400">[{index}]</span>
            </motion.div>
          </HoverLabel>
        ))}
      </div>
      <p className="text-center text-sm text-slate-400">
        Indexed cells make lookup direct and traversal predictable.
      </p>
    </div>
  )
}

export default ArrayVisualizer
