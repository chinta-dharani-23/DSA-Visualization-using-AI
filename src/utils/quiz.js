export function normalizeQuiz(rawQuiz, topic, difficulty) {
  const questions = Array.isArray(rawQuiz?.questions) ? rawQuiz.questions : []

  return {
    topic: rawQuiz?.topic ?? topic.name,
    difficulty: rawQuiz?.difficulty ?? difficulty,
    questions: questions.slice(0, 5).map((question, index) => {
      const options = Array.isArray(question?.options)
        ? question.options.slice(0, 4)
        : []

      return {
        id: question?.id ?? `question-${index + 1}`,
        question: question?.question ?? '',
        options,
        answerIndex:
          Number.isInteger(question?.answerIndex) &&
          question.answerIndex >= 0 &&
          question.answerIndex < options.length
            ? question.answerIndex
            : 0,
        explanation: question?.explanation ?? '',
      }
    }),
  }
}

export function calculateQuizScore(answers, questions) {
  return questions.reduce((score, question, index) => {
    return answers[index] === question.answerIndex ? score + 1 : score
  }, 0)
}
