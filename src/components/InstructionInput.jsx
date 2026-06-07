const examples = [
  'Insert 10 20 30 into BST',
  'Run BFS from node A',
  'Sort 5 2 9 1 using Merge Sort',
  'Push 10 into Stack',
  'Enqueue 20 into Queue',
  'Reverse a Linked List',
]

function InstructionInput({
  instruction,
  isLoading,
  onChangeInstruction,
  onSubmit,
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Natural language input
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Describe the visualization
        </h2>
      </div>

      <form className="mt-5" onSubmit={onSubmit}>
        <textarea
          className="min-h-40 w-full resize-y rounded-md border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/50 focus:ring-2 focus:ring-emerald-300/20"
          onChange={(event) => onChangeInstruction(event.target.value)}
          placeholder="Example: Insert 10 20 30 into BST"
          value={instruction}
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Gemini returns JSON instructions only.
          </p>
          <button
            className="rounded-md bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Parsing...' : 'Generate JSON'}
          </button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-slate-300 transition hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-white"
            key={example}
            onClick={() => onChangeInstruction(example)}
            type="button"
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  )
}

export default InstructionInput
