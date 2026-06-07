import { motion } from 'framer-motion'

function TreeNode({ isActive, label, level }) {
  return (
    <motion.div
      animate={{
        y: isActive ? -8 : 0,
        boxShadow: isActive
          ? '0 18px 40px rgba(34, 211, 238, 0.28)'
          : '0 10px 26px rgba(0, 0, 0, 0.2)',
      }}
      className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-semibold text-white shadow-lg"
      initial={{ opacity: 0, scale: 0.82, rotateX: -18 }}
      transition={{ delay: level * 0.08, duration: 0.35 }}
      whileHover={{ scale: 1.1, rotateX: 10 }}
    >
      {label}
      <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-xs text-cyan-100 group-hover:block">
        level {level}
      </span>
    </motion.div>
  )
}

function TreeVisualizer({ isExploring = false, type = 'tree' }) {
  const root = type === 'heap' ? '92' : type === 'trie' ? '*' : '40'
  const second = type === 'trie' ? ['c', 'd'] : ['20', '65']
  const third = type === 'trie' ? ['a', 'o', 'a', 'p'] : ['10', '30', '55', '80']

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-5">
      <TreeNode isActive={isExploring} label={root} level={0} />
      <motion.div
        animate={{ opacity: isExploring ? [0.3, 1, 0.3] : 1 }}
        className="h-6 w-px bg-white/20"
        transition={{ duration: 1.2, repeat: isExploring ? Infinity : 0 }}
      />
      <div className="grid grid-cols-2 gap-12">
        {second.map((node, index) => (
          <TreeNode
            isActive={isExploring && index === 0}
            key={node}
            label={node}
            level={1}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 sm:gap-8">
        {third.map((node, index) => (
          <TreeNode
            isActive={isExploring && index === 2}
            key={`${node}-${index}`}
            label={node}
            level={2}
          />
        ))}
      </div>
      <p className="text-center text-sm text-slate-400">
        Branching structure organizes decisions, ordering, or prefixes.
      </p>
    </div>
  )
}

export default TreeVisualizer
