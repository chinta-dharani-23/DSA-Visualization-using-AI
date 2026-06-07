function JsonOutputPanel({ error, result }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Structured output
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Visualization JSON
        </h2>
      </div>

      <div className="mt-5 min-h-96 overflow-auto rounded-md border border-white/10 bg-[#05070d] p-4">
        {error && <p className="text-sm leading-6 text-rose-300">{error}</p>}
        {!error && result && (
          <pre className="text-sm leading-6 text-emerald-100">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
        {!error && !result && (
          <p className="text-sm leading-6 text-slate-400">
            Your parsed JSON instructions will appear here.
          </p>
        )}
      </div>
    </section>
  )
}

export default JsonOutputPanel
