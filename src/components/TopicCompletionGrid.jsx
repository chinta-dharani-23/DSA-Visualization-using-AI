function TopicCompletionGrid({ topics }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold text-white">Topic Completion</h2>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic) => (
          <div
            className={`rounded-md border p-3 ${
              topic.isCompleted
                ? 'border-emerald-300/30 bg-emerald-300/10'
                : 'border-white/10 bg-black/20'
            }`}
            key={topic.id}
          >
            <p className="text-sm font-semibold text-white">{topic.name}</p>
            <p className="mt-1 text-xs text-slate-400">
              {topic.isCompleted
                ? `Best ${topic.bestPercentage}%`
                : 'Not completed'}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopicCompletionGrid
