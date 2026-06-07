import { useMemo, useState } from 'react'
import { explainConcept } from '../ai'
import { ExplanationPanel, QuizModule, TopicSelector } from '../components'
import { conceptTopics, getConceptTopic } from '../engine'
import { ConceptVisualizer } from '../visualizers'

function ConceptTutorPage({ onBack }) {
  const [activeTopicId, setActiveTopicId] = useState(conceptTopics[0].id)
  const [aiExplanation, setAiExplanation] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const activeTopic = useMemo(
    () => getConceptTopic(activeTopicId),
    [activeTopicId],
  )

  function handleSelectTopic(topicId) {
    setActiveTopicId(topicId)
    setAiExplanation('')
    setError('')
  }

  async function handleGenerateExplanation() {
    setIsLoading(true)
    setError('')

    try {
      const explanation = await explainConcept(activeTopic.name)
      setAiExplanation(explanation)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

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
              AI Visual Concept Tutor
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Select a DSA topic, inspect the reusable visual model, and ask AI
              for a focused explanation.
            </p>
          </div>
          <div className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
            {conceptTopics.length} supported topics
          </div>
        </header>

        <div className="grid gap-6 py-6 lg:grid-cols-[280px_1fr]">
          <TopicSelector
            activeTopicId={activeTopicId}
            onSelectTopic={handleSelectTopic}
            topics={conceptTopics}
          />
          <div className="grid gap-6">
            <ExplanationPanel
              aiExplanation={aiExplanation}
              error={error}
              isLoading={isLoading}
              onGenerate={handleGenerateExplanation}
              topic={activeTopic}
            />
            <ConceptVisualizer topic={activeTopic} />
            <QuizModule topic={activeTopic} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ConceptTutorPage
