import { useMemo, useState } from 'react'
import { generateQuiz } from '../ai'
import { useLocalScores } from '../hooks'
import { calculateQuizScore, normalizeQuiz } from '../utils'
import QuizQuestion from './QuizQuestion'

const difficulties = ['beginner', 'intermediate', 'advanced']

function QuizModule({ topic }) {
  const [difficulty, setDifficulty] = useState('beginner')
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasSavedScore, setHasSavedScore] = useState(false)
  const { getBestScore, saveScore } = useLocalScores()

  const answeredCount = Object.keys(answers).length
  const bestScore = getBestScore(topic.id, difficulty)
  const questionCount = quiz?.questions.length ?? 0
  const score = useMemo(() => {
    return quiz ? calculateQuizScore(answers, quiz.questions) : 0
  }, [answers, quiz])
  const isComplete = Boolean(quiz) && questionCount > 0 && answeredCount === questionCount
  const percentage = questionCount ? Math.round((score / questionCount) * 100) : 0

  async function handleGenerateQuiz() {
    setIsLoading(true)
    setError('')
    setAnswers({})
    setHasSavedScore(false)

    try {
      const rawQuiz = await generateQuiz(topic.name, { difficulty })
      const normalizedQuiz = normalizeQuiz(rawQuiz, topic, difficulty)

      if (normalizedQuiz.questions.length === 0) {
        throw new Error('Gemini returned an empty quiz. Please try again.')
      }

      setQuiz(normalizedQuiz)
    } catch (requestError) {
      setQuiz(null)
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  function handleSelectAnswer(questionIndex, answerIndex) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionIndex]: answerIndex,
    }))
  }

  function handleSaveScore() {
    if (!quiz || hasSavedScore || questionCount === 0) {
      return
    }

    saveScore({
      topicId: topic.id,
      topicName: topic.name,
      difficulty,
      score,
      total: quiz.questions.length,
      percentage,
    })
    setHasSavedScore(true)
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            AI quiz module
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {topic.name} Quiz
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Generate topic-wise multiple choice questions and track your score
            locally.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
            onChange={(event) => {
              setDifficulty(event.target.value)
              setQuiz(null)
              setAnswers({})
              setError('')
              setHasSavedScore(false)
            }}
            value={difficulty}
          >
            {difficulties.map((level) => (
              <option className="bg-slate-950" key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
            disabled={isLoading}
            onClick={handleGenerateQuiz}
            type="button"
          >
            {isLoading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-white/10 bg-black/20 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Current score
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {quiz ? `${score}/${questionCount}` : '0/0'}
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Progress
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {quiz ? `${answeredCount}/${questionCount}` : '0/0'}
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Best local score
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {bestScore ? `${bestScore.score}/${bestScore.total}` : 'None yet'}
          </p>
        </div>
      </div>

      {error && <p className="mt-4 text-sm leading-6 text-rose-300">{error}</p>}

      {quiz && (
        <div className="mt-5 grid gap-4">
          {quiz.questions.map((question, index) => (
            <QuizQuestion
              answer={answers[index]}
              index={index}
              key={question.id}
              onSelectAnswer={handleSelectAnswer}
              question={question}
            />
          ))}

          {isComplete && (
            <div className="rounded-md border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="text-sm font-semibold text-white">
                Final score: {score}/{questionCount} ({percentage}%)
              </p>
              <button
                className="mt-3 rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
                disabled={hasSavedScore}
                onClick={handleSaveScore}
                type="button"
              >
                {hasSavedScore ? 'Score Saved' : 'Save Score Locally'}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default QuizModule
