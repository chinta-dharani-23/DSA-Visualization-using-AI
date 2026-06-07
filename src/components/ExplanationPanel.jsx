function ExplanationPanel({ aiExplanation, error, isLoading, onGenerate, topic }) {

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            Concept tutor
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {topic.name}
          </h2>
        </div>
        <button
          className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
          disabled={isLoading}
          onClick={onGenerate}
          type="button"
        >
          {isLoading ? 'Thinking...' : 'Ask AI'}
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Core idea</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{topic.summary}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Complexity</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {topic.complexity}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-semibold text-white">AI explanation</h3>
        {error && <p className="mt-3 text-sm leading-6 text-rose-300">{error}</p>}
        {!error && (
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
            {aiExplanation ||
              'Choose a topic and ask AI for a focused explanation when you are ready.'}
          </p>
        )}
      </div>
    </section>
  )
}

export default ExplanationPanel
