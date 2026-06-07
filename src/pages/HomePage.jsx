const featureCards = [
  {
    title: 'AI Visual Concept Tutor',
    description:
      'Learn data structures and algorithms through guided explanations, diagrams, and step-by-step visual intuition.',
    accent: 'from-cyan-400 to-blue-500',
    action: 'concept-tutor',
  },
  {
    title: 'AI Code / Natural Language Visualizer',
    description:
      'Turn code snippets or plain-language prompts into structured visualization plans for algorithm walkthroughs.',
    accent: 'from-emerald-400 to-teal-500',
    action: 'code-visualizer',
  },
  {
    title: 'Progress Tracking Dashboard',
    description:
      'Review completed topics, quiz scores, learning progress, and the areas that need more practice.',
    accent: 'from-indigo-400 to-cyan-500',
    action: 'progress-dashboard',
  },
  {
    title: 'About Project',
    description:
      'See the AI workflow, Gemini integration, system architecture, visualization engine, and demo-ready feature checklist.',
    accent: 'from-fuchsia-400 to-rose-500',
    action: 'about',
  },
]

function HomePage({
  onOpenAbout,
  onOpenConceptTutor,
  onOpenProgressDashboard,
  onOpenVisualizationGenerator,
}) {
  function handleCardClick(action) {
    if (action === 'concept-tutor') {
      onOpenConceptTutor()
      return
    }

    if (action === 'code-visualizer') {
      onOpenVisualizationGenerator()
      return
    }

    if (action === 'progress-dashboard') {
      onOpenProgressDashboard()
      return
    }

    if (action === 'about') {
      onOpenAbout()
    }
  }

  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-5 py-10 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            AI-powered DSA learning
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-normal text-white sm:text-6xl lg:text-7xl">
            DSA Vision AI
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Understand algorithms visually, transform ideas into structured
            walkthroughs, and build stronger problem-solving intuition with AI.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:mt-16">
          {featureCards.map((card) => (
            <button
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-6 text-left shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-cyan-300/50 sm:p-8"
              key={card.title}
              onClick={() => handleCardClick(card.action)}
              type="button"
            >
              <div
                className={`h-1 w-20 rounded-full bg-gradient-to-r ${card.accent}`}
              />
              <h2 className="mt-8 text-2xl font-semibold tracking-normal text-white sm:text-3xl">
                {card.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                {card.description}
              </p>
              <div className="mt-8 flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-lg text-cyan-200 transition group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10">
                {'>'}
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
