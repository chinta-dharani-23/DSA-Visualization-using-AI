function uniqueValues(values) {
  return [...new Set(values)]
}

function getTopicScores(scores, topicId) {
  return scores.filter((score) => score.topicId === topicId)
}

function getBestPercentage(scores) {
  if (scores.length === 0) {
    return null
  }

  return Math.max(...scores.map((score) => score.percentage ?? 0))
}

function getAveragePercentage(scores) {
  if (scores.length === 0) {
    return null
  }

  const total = scores.reduce((sum, score) => sum + (score.percentage ?? 0), 0)
  return Math.round(total / scores.length)
}

export function summarizeLearningProgress(scores, topics) {
  const completedTopicIds = uniqueValues(scores.map((score) => score.topicId))
  const completedTopics = topics.filter((topic) =>
    completedTopicIds.includes(topic.id),
  )
  const topicSummaries = topics.map((topic) => {
    const topicScores = getTopicScores(scores, topic.id)
    const bestPercentage = getBestPercentage(topicScores)
    const averagePercentage = getAveragePercentage(topicScores)

    return {
      ...topic,
      attempts: topicScores.length,
      bestPercentage,
      averagePercentage,
      isCompleted: topicScores.length > 0,
    }
  })

  const attemptedSummaries = topicSummaries.filter((topic) => topic.isCompleted)
  const strongTopics = attemptedSummaries
    .filter((topic) => topic.bestPercentage >= 80)
    .sort((first, second) => second.bestPercentage - first.bestPercentage)
  const weakTopics = attemptedSummaries
    .filter((topic) => topic.bestPercentage < 60)
    .sort((first, second) => first.bestPercentage - second.bestPercentage)
  const totalAttempts = scores.length
  const averageScore = getAveragePercentage(scores) ?? 0
  const progressPercentage =
    topics.length > 0
      ? Math.round((completedTopics.length / topics.length) * 100)
      : 0

  return {
    averageScore,
    completedCount: completedTopics.length,
    completedTopics,
    progressPercentage,
    strongTopics,
    topicSummaries,
    totalAttempts,
    totalTopics: topics.length,
    weakTopics,
  }
}
