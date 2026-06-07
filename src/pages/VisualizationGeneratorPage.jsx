import { useState } from 'react'
import { CodeInput, InstructionInput, JsonOutputPanel } from '../components'
import {
  parseCodeVisualizationInstruction,
  parseVisualizationInstruction,
} from '../parser'
import { EnginePreview } from '../visualizers'

function VisualizationGeneratorPage({ onBack }) {
  const [inputMode, setInputMode] = useState('natural-language')
  const [instruction, setInstruction] = useState('')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const parsedInstruction =
        inputMode === 'code'
          ? await parseCodeVisualizationInstruction(code, language)
          : await parseVisualizationInstruction(instruction)
      setResult(parsedInstruction)
    } catch (requestError) {
      setError(requestError.message)
      setResult(null)
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
              className="text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
              onClick={onBack}
              type="button"
            >
              &lt; Back
            </button>
            <h1 className="mt-4 text-3xl font-bold tracking-normal sm:text-4xl">
              AI Code / Natural Language Visualizer
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Convert pasted code or student instructions into normalized JSON,
              then pass it into the existing visualization engine.
            </p>
          </div>
          <div className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
            JSON instructions only
          </div>
        </header>

        <div className="py-6">
          <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.04] p-1">
            <button
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                inputMode === 'natural-language'
                  ? 'bg-emerald-300 text-slate-950'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
              }`}
              onClick={() => setInputMode('natural-language')}
              type="button"
            >
              Natural Language
            </button>
            <button
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                inputMode === 'code'
                  ? 'bg-emerald-300 text-slate-950'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
              }`}
              onClick={() => setInputMode('code')}
              type="button"
            >
              Code
            </button>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {inputMode === 'code' ? (
              <CodeInput
                code={code}
                isLoading={isLoading}
                language={language}
                onChangeCode={setCode}
                onChangeLanguage={setLanguage}
                onSubmit={handleSubmit}
              />
            ) : (
              <InstructionInput
                instruction={instruction}
                isLoading={isLoading}
                onChangeInstruction={setInstruction}
                onSubmit={handleSubmit}
              />
            )}

            <div className="grid gap-6">
              <JsonOutputPanel error={error} result={result} />
              <EnginePreview instruction={result} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default VisualizationGeneratorPage
