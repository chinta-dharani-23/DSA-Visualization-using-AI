const capabilityCards = [
  {
    label: 'AI workflow',
    value: 'Gemini generates explanations, quizzes, and visualization JSON from user input.',
  },
  {
    label: 'AI model output',
    value: 'Text explanations, structured quiz payloads, and normalized instruction objects.',
  },
  {
    label: 'User interaction',
    value: 'Topic selection, code / prompt input, quiz answering, and progress review.',
  },
  {
    label: 'Progress tracking',
    value: 'Local score history, topic completion summaries, and weak / strong topic insights.',
  },
]

const requirementRows = [
  ['AI explanations', 'Concept Tutor page', 'Gemini text explanations with beginner-friendly context'],
  ['Interactive quizzes', 'QuizModule', 'Five-question AI-generated quizzes with saved scores'],
  ['Simulations', 'Visualization Generator', 'JSON-driven engine preview for algorithm walkthroughs'],
  ['Practical activities', 'Code / natural language inputs', 'Convert real prompts and code into visualization plans'],
  ['3D / 2.5D visualization', 'Framer Motion visualizers', 'Layered cards, gradients, depth, and motion-based feedback'],
  ['Mobile responsive UI', 'Tailwind layout system', 'Responsive grids, flexible panels, and stacked mobile flow'],
]

function AboutProjectPage({ onBack }) {
  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              className="text-sm font-semibold text-fuchsia-300 transition hover:text-fuchsia-200"
              onClick={onBack}
              type="button"
            >
              &lt; Back
            </button>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-fuchsia-300">
              Project overview
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
              About DSA Vision AI
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
              A demo-focused AI learning app for data structures and algorithms.
              It combines Gemini-powered explanations, structured visualization
              generation, interactive quizzes, and progress tracking in one
              presentation-friendly flow.
            </p>
          </div>
          <div className="rounded-md border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-3 text-sm text-fuchsia-100">
            Demo-ready learning system
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilityCards.map((card) => (
            <article
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20"
              key={card.label}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {card.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-200">{card.value}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-fuchsia-300">
              System architecture
            </p>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
              <p>
                1. The user chooses a learning path from the home screen.
              </p>
              <p>
                2. Gemini produces text explanations, quiz payloads, or JSON
                visualization instructions depending on the feature.
              </p>
              <p>
                3. Parsers normalize the response into app-friendly models for
                rendering, scoring, and visual playback.
              </p>
              <p>
                4. React pages present the result through reusable visualizers,
                quiz panels, and the progress dashboard.
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-fuchsia-300">
              Data flow
            </p>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
              <p>
                User input → AI request → model response → normalization → UI
                rendering → local progress storage.
              </p>
              <p>
                Quiz results are stored in localStorage, then summarized into
                topic completion, strong topics, and weak topics.
              </p>
              <p>
                Visualization instructions are transformed into engine-friendly
                JSON before being previewed by the existing visualizer shell.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-fuchsia-300">
            Requirement coverage
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-1 divide-y divide-white/10 bg-black/20 text-sm sm:grid-cols-[180px_220px_1fr] sm:divide-x sm:divide-y-0">
              {requirementRows.map(([feature, screen, notes]) => (
                <div className="grid gap-1 p-4 sm:contents" key={feature}>
                  <div className="font-semibold text-white sm:border-r sm:border-white/10 sm:p-4">
                    {feature}
                  </div>
                  <div className="text-slate-300 sm:border-r sm:border-white/10 sm:p-4">
                    {screen}
                  </div>
                  <div className="text-slate-400 sm:p-4">{notes}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-fuchsia-300">
              AI APIs used
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>Gemini Generate Content API for explanations, quizzes, and instructions.</li>
              <li>Browser Fetch API for all AI calls.</li>
              <li>LocalStorage for quiz score persistence and progress tracking.</li>
            </ul>
          </article>

          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-fuchsia-300">
              Gemini integration
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>Text explanations are generated through the concept tutor flow.</li>
              <li>Quiz JSON is normalized into a stable structure before rendering.</li>
              <li>Visualization JSON is parsed into the engine preview pipeline.</li>
            </ul>
          </article>
        </section>

        <section className="mt-6 rounded-lg border border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-cyan-400/10 to-emerald-400/10 p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-fuchsia-200">
            Demo presentation notes
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-200">
            Open the Concept Tutor first for the strongest AI story, then move to
            the Visualizer for structured JSON generation, and finish on the
            Progress Dashboard to show persistence and learning outcomes.
          </p>
        </section>
      </div>
    </main>
  )
}

export default AboutProjectPage