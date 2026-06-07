import { resolveVisualizationTopic } from '../engine'
import ConceptVisualizer from './ConceptVisualizer'

function EnginePreview({ instruction }) {
  if (!instruction) {
    return (
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Visualization engine
        </p>
        <div className="mt-5 rounded-lg border border-white/10 bg-[#0b1020] p-6 text-sm leading-6 text-slate-400">
          Generate JSON to preview it with the existing visualization engine.
        </div>
      </section>
    )
  }

  const topic = resolveVisualizationTopic(instruction)

  return (
    <div className="grid gap-4">
      <ConceptVisualizer topic={topic} />
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Engine steps
        </h2>
        <div className="mt-4 grid gap-2">
          {instruction.steps.length > 0 ? (
            instruction.steps.map((step) => (
              <div
                className="rounded-md border border-white/10 bg-black/20 p-3"
                key={step.id}
              >
                <p className="text-sm font-semibold text-white">{step.action}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {step.description || 'No description provided.'}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm leading-6 text-slate-400">
              No explicit steps were returned.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default EnginePreview
