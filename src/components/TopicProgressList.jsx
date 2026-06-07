function TopicProgressList({ emptyText, title, topics, tone = 'cyan' }) {
  const toneClass =
    tone === 'emerald'
      ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100'
      : tone === 'rose'
        ? 'border-rose-300/30 bg-rose-300/10 text-rose-100'
        : 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100'

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4 grid gap-3">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div
              className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-black/20 p-3"
              key={topic.id}
            >
              <div>
                <p className="text-sm font-semibold text-white">{topic.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {topic.attempts} attempt{topic.attempts === 1 ? '' : 's'}
                </p>
              </div>
              <span
                className={`rounded-md border px-3 py-1 text-sm font-semibold ${toneClass}`}
              >
                {topic.bestPercentage}%
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm leading-6 text-slate-400">{emptyText}</p>
        )}
      </div>
    </section>
  )
}

export default TopicProgressList
