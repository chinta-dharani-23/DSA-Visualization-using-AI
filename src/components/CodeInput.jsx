const supportedLanguages = [
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'python' },
  { label: 'JavaScript', value: 'javascript' },
]

const codeExamples = [
  {
    label: 'BST inserts',
    language: 'javascript',
    code: 'insert(10);\ninsert(20);',
  },
  {
    label: 'Stack ops',
    language: 'javascript',
    code: 'stack.push(10);\nstack.pop();',
  },
  {
    label: 'Python queue',
    language: 'python',
    code: 'queue.enqueue(20)\nqueue.dequeue()',
  },
]

function CodeInput({
  code,
  isLoading,
  language,
  onChangeCode,
  onChangeLanguage,
  onSubmit,
}) {
  function applyExample(example) {
    onChangeLanguage(example.language)
    onChangeCode(example.code)
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Code input
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Paste student code
        </h2>
      </div>

      <form className="mt-5" onSubmit={onSubmit}>
        <label className="text-sm font-semibold text-slate-300" htmlFor="language">
          Language
        </label>
        <select
          className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-300/50 focus:ring-2 focus:ring-emerald-300/20"
          id="language"
          onChange={(event) => onChangeLanguage(event.target.value)}
          value={language}
        >
          {supportedLanguages.map((option) => (
            <option className="bg-slate-950" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <textarea
          className="mt-4 min-h-56 w-full resize-y rounded-md border border-white/10 bg-black/30 p-4 font-mono text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/50 focus:ring-2 focus:ring-emerald-300/20"
          onChange={(event) => onChangeCode(event.target.value)}
          placeholder={'insert(10);\ninsert(20);'}
          spellCheck="false"
          value={code}
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Gemini extracts operations and returns engine-ready JSON.
          </p>
          <button
            className="rounded-md bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Code'}
          </button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        {codeExamples.map((example) => (
          <button
            className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-slate-300 transition hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-white"
            key={example.label}
            onClick={() => applyExample(example)}
            type="button"
          >
            {example.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default CodeInput
