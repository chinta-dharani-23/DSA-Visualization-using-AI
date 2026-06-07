import { cloneElement, isValidElement, useState } from 'react'
import { motion } from 'framer-motion'

const zoomLevels = [0.75, 1, 1.25, 1.5]

function VisualizationShell({ children, subtitle, title }) {
  const [zoomIndex, setZoomIndex] = useState(1)
  const [isExploring, setIsExploring] = useState(false)
  const zoom = zoomLevels[zoomIndex]
  const enhancedChildren = isValidElement(children)
    ? cloneElement(children, { isExploring })
    : children

  function zoomIn() {
    setZoomIndex((currentIndex) =>
      Math.min(currentIndex + 1, zoomLevels.length - 1),
    )
  }

  function zoomOut() {
    setZoomIndex((currentIndex) => Math.max(currentIndex - 1, 0))
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            Visual model
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            onClick={zoomOut}
            type="button"
          >
            Zoom -
          </button>
          <button
            className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            onClick={zoomIn}
            type="button"
          >
            Zoom +
          </button>
          <button
            className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            onClick={() => setZoomIndex(1)}
            type="button"
          >
            Reset
          </button>
          <button
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
              isExploring
                ? 'bg-cyan-300 text-slate-950'
                : 'border border-white/10 bg-white/[0.05] text-slate-200 hover:border-cyan-300/40 hover:bg-cyan-300/10'
            }`}
            onClick={() => setIsExploring((currentMode) => !currentMode)}
            type="button"
          >
            Explore
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-[#0b1020] p-3 sm:p-4">
        <motion.div
          animate={{ scale: zoom }}
          className="min-h-72 origin-center rounded-lg bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-3"
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {enhancedChildren}
        </motion.div>
      </div>
    </section>
  )
}

export default VisualizationShell
