import { useEffect, useState } from 'react'

const STORAGE_KEY = 'dsa-vision-ai.quiz-scores'

function readScores() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedScores = window.localStorage.getItem(STORAGE_KEY)
    const parsedScores = storedScores ? JSON.parse(storedScores) : []

    return Array.isArray(parsedScores) ? parsedScores : []
  } catch {
    return []
  }
}

function writeScores(scores) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch {
    // Ignore persistence failures so the dashboard still works in-memory.
  }
}

function createScoreId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useLocalScores() {
  const [scores, setScores] = useState(() => readScores())

  useEffect(() => {
    writeScores(scores)
  }, [scores])

  function saveScore(score) {
    const scoreEntry = {
      ...score,
      id: createScoreId(),
      completedAt: new Date().toISOString(),
    }

    setScores((currentScores) => [scoreEntry, ...currentScores].slice(0, 50))
  }

  function getBestScore(topicId, difficulty) {
    return scores
      .filter((score) => score.topicId === topicId && score.difficulty === difficulty)
      .sort((first, second) => second.percentage - first.percentage)[0]
  }

  return {
    getBestScore,
    saveScore,
    scores,
  }
}
