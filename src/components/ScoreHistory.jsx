function ScoreHistory({ scores }) {
  const recentScores = scores.slice(0, 8)

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold text-white">Recent Quiz Scores</h2>
      <div className="mt-4 grid gap-3">
        {recentScores.length > 0 ? (
          recentScores.map((score) => (
            <div
              className="flex flex-col gap-2 rounded-md border border-white/10 bg-black/20 p-3 sm:flex-row sm:items-center sm:justify-between"
              key={score.id}
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {score.topicName}
                </p>
                <p className="mt-1 text-xs capitalize text-slate-500">
                  {score.difficulty} · {new Date(score.completedAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm font-semibold text-cyan-200">
                {score.score}/{score.total} ({score.percentage}%)
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm leading-6 text-slate-400">
            Complete and save a quiz score to start tracking progress.
          </p>
        )}
      </div>
    </section>
  )
}

export default ScoreHistory
