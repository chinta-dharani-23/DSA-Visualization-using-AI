import { useMemo } from 'react'
import {
  DashboardStatCard,
  ProgressBar,
  ScoreHistory,
  TopicCompletionGrid,
  TopicProgressList,
} from '../components'
import { conceptTopics } from '../engine'
import { useLocalScores } from '../hooks'
import { summarizeLearningProgress } from '../utils'

function ProgressDashboardPage({ onBack }) {
  const { scores } = useLocalScores()
  const progress = useMemo(
    () => summarizeLearningProgress(scores, conceptTopics),
    [scores],
  )

  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              onClick={onBack}
              type="button"
            >
              &lt; Back
            </button>
            <h1 className="mt-4 text-3xl font-bold tracking-normal sm:text-4xl">
              Progress Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Track completed topics, quiz performance, learning progress,
              strong areas, and weak topics from locally saved scores.
            </p>
          </div>
          <div className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
            Local storage only
          </div>
        </header>

        <section className="py-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  Learning progress
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {progress.completedCount}/{progress.totalTopics} topics completed
                </h2>
              </div>
              <p className="text-3xl font-bold text-white">
                {progress.progressPercentage}%
              </p>
            </div>
            <div className="mt-5">
              <ProgressBar value={progress.progressPercentage} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DashboardStatCard
              helper="Topics with at least one saved quiz score."
              label="Topics Completed"
              value={progress.completedCount}
            />
            <DashboardStatCard
              helper="All saved quiz attempts on this device."
              label="Quiz Attempts"
              value={progress.totalAttempts}
            />
            <DashboardStatCard
              helper="Average percentage across saved scores."
              label="Average Score"
              value={`${progress.averageScore}%`}
            />
            <DashboardStatCard
              helper="Topics scoring 80% or higher."
              label="Strong Topics"
              value={progress.strongTopics.length}
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <TopicProgressList
              emptyText="No strong topics yet. Score 80% or higher on a quiz to unlock this section."
              title="Strong Topics"
              tone="emerald"
              topics={progress.strongTopics}
            />
            <TopicProgressList
              emptyText="No weak topics yet. Scores below 60% will appear here for review."
              title="Weak Topics"
              tone="rose"
              topics={progress.weakTopics}
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <TopicCompletionGrid topics={progress.topicSummaries} />
            <ScoreHistory scores={scores} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProgressDashboardPage
