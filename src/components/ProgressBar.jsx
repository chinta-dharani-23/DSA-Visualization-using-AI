function ProgressBar({ value }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 transition-all"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  )
}

export default ProgressBar
