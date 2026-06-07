function QuizQuestion({ answer, index, onSelectAnswer, question }) {
  const hasAnswered = answer !== undefined

  return (
    <article className="rounded-md border border-white/10 bg-black/20 p-4">
      <h3 className="text-sm font-semibold leading-6 text-white">
        {index + 1}. {question.question}
      </h3>

      <div className="mt-4 grid gap-2">
        {question.options.map((option, optionIndex) => {
          const isSelected = answer === optionIndex
          const isCorrect = question.answerIndex === optionIndex
          const feedbackClass =
            hasAnswered && isCorrect
              ? 'border-emerald-300/50 bg-emerald-300/10 text-emerald-100'
              : hasAnswered && isSelected
                ? 'border-rose-300/50 bg-rose-300/10 text-rose-100'
                : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white'

          return (
            <button
              className={`rounded-md border px-3 py-2 text-left text-sm transition ${feedbackClass}`}
              disabled={hasAnswered}
              key={option}
              onClick={() => onSelectAnswer(index, optionIndex)}
              type="button"
            >
              {option}
            </button>
          )
        })}
      </div>

      {hasAnswered && (
        <div className="mt-4 rounded-md border border-white/10 bg-white/[0.04] p-3">
          <p className="text-sm font-semibold text-white">
            {answer === question.answerIndex ? 'Correct' : 'Not quite'}
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            {question.explanation}
          </p>
        </div>
      )}
    </article>
  )
}

export default QuizQuestion
