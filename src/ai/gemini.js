const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta'
const DEFAULT_MODEL = 'gemini-2.5-flash'
const DEFAULT_REQUEST_TIMEOUT_MS = 15000

function getGeminiApiKey() {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing VITE_GEMINI_API_KEY environment variable.')
  }

  return GEMINI_API_KEY
}

function createGeminiUrl(model = DEFAULT_MODEL) {
  return `${GEMINI_API_URL}/models/${model}:generateContent`
}

function createTextRequest(prompt, options = {}) {
  return {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: options.temperature ?? 0.4,
      responseMimeType: options.responseMimeType,
    },
  }
}

function createRequestTimeout(timeoutMs) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)

  return {
    controller,
    clear() {
      window.clearTimeout(timeoutId)
    },
  }
}

async function readGeminiErrorMessage(response) {
  const fallbackMessage = `Gemini API request failed with status ${response.status}.`

  try {
    const bodyText = await response.text()

    if (!bodyText) {
      return fallbackMessage
    }

    try {
      const parsedBody = JSON.parse(bodyText)
      return (
        parsedBody?.error?.message ||
        parsedBody?.message ||
        `${fallbackMessage} ${bodyText}`
      )
    } catch {
      return `${fallbackMessage} ${bodyText}`
    }
  } catch {
    return fallbackMessage
  }
}

function extractText(response) {
  const parts = response?.candidates?.[0]?.content?.parts ?? []

  return parts.map((part) => part.text).filter(Boolean).join('\n').trim()
}

function parseJSONResponse(text) {
  try {
    return JSON.parse(text)
  } catch {
    throw new Error('Gemini returned an invalid JSON response.')
  }
}

async function generateGeminiContent(prompt, options = {}) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS
  const requestTimeout = createRequestTimeout(timeoutMs)

  try {
    const response = await fetch(createGeminiUrl(options.model), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': getGeminiApiKey(),
      },
      body: JSON.stringify(createTextRequest(prompt, options)),
      signal: requestTimeout.controller.signal,
    })

    if (!response.ok) {
      throw new Error(await readGeminiErrorMessage(response))
    }

    let data

    try {
      data = await response.json()
    } catch {
      throw new Error('Gemini returned a malformed response.')
    }

    const text = extractText(data)

    if (!text) {
      throw new Error('Gemini returned an empty response.')
    }

    return text
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Gemini request timed out. Please try again.')
    }

    throw error
  } finally {
    requestTimeout.clear()
  }
}

function createConceptPrompt(concept) {
  return `
Explain this data structures and algorithms concept clearly:

${concept}

Keep the explanation practical and beginner-friendly. Include intuition,
time complexity when relevant, and a short example.
`.trim()
}

function createVisualizationPrompt(topic) {
  return `
Create a visualization plan as valid JSON for this DSA topic:

${topic}

Return only JSON with this shape:
{
  "title": "string",
  "description": "string",
  "steps": [
    {
      "id": "string",
      "label": "string",
      "state": {},
      "explanation": "string"
    }
  ]
}
`.trim()
}

function createVisualizationInstructionsPrompt(instruction) {
  return `
Convert this student instruction into structured JSON for a DSA visualization engine:

${instruction}

Do not create UI, HTML, CSS, React, or prose. Return only JSON.

The JSON must follow this shape:
{
  "input": "original user instruction",
  "domain": "data-structure | algorithm | pattern",
  "structure": "array | string | linked-list | stack | queue | tree | bst | avl | heap | trie | graph | unknown",
  "algorithm": "bfs | dfs | dijkstra | merge-sort | quick-sort | insertion-sort | binary-search | recursion | backtracking | dynamic-programming | greedy | none",
  "operation": "insert | delete | push | pop | enqueue | dequeue | reverse | sort | search | traverse | shortest-path | build | run | unknown",
  "values": [],
  "startNode": null,
  "target": null,
  "nodes": [],
  "edges": [],
  "options": {},
  "steps": [
    {
      "id": "string",
      "action": "string",
      "payload": {},
      "description": "string"
    }
  ]
}

Rules:
- Use numbers for numeric values.
- Use strings for graph node labels.
- Keep "steps" as engine instructions, not visual layout instructions.
- If details are missing, use null, [], {}, "none", or "unknown".
- Preserve the original instruction in "input".
`.trim()
}

function createCodeVisualizationInstructionsPrompt(code, language) {
  return `
Analyze this ${language} code and convert the data structure or algorithm operations into structured JSON for a DSA visualization engine:

\`\`\`${language}
${code}
\`\`\`

Do not create UI, HTML, CSS, React, or prose. Return only JSON.

The JSON must follow this shape:
{
  "input": "original code",
  "sourceType": "code",
  "language": "${language}",
  "domain": "data-structure | algorithm | pattern",
  "structure": "array | string | linked-list | stack | queue | tree | bst | avl | heap | trie | graph | unknown",
  "algorithm": "bfs | dfs | dijkstra | merge-sort | quick-sort | insertion-sort | binary-search | recursion | backtracking | dynamic-programming | greedy | none",
  "operation": "insert | delete | push | pop | enqueue | dequeue | reverse | sort | search | traverse | shortest-path | build | run | unknown",
  "values": [],
  "startNode": null,
  "target": null,
  "nodes": [],
  "edges": [],
  "options": {},
  "steps": [
    {
      "id": "string",
      "action": "string",
      "payload": {},
      "description": "string"
    }
  ]
}

Rules:
- Extract operations such as insert(10), stack.push(10), stack.pop(), enqueue(20), reverse(), sort(), BFS(), DFS(), and Dijkstra().
- Use numbers for numeric values.
- Use strings for graph node labels.
- Keep "steps" as engine instructions, not visual layout instructions.
- If details are missing, use null, [], {}, "none", or "unknown".
- Preserve the original code in "input".
`.trim()
}

function createQuizPrompt(topic, difficulty = 'beginner') {
  return `
Create a multiple choice quiz as valid JSON for this DSA topic:

${topic}

Difficulty: ${difficulty}

Return only JSON with this shape:
{
  "topic": "string",
  "difficulty": "beginner | intermediate | advanced",
  "questions": [
    {
      "id": "string",
      "question": "string",
      "options": ["string"],
      "answerIndex": 0,
      "explanation": "string"
    }
  ]
}

Rules:
- Generate exactly 5 questions.
- Each question must have exactly 4 options.
- answerIndex must be the zero-based index of the correct option.
- Explanations should be concise and educational.
`.trim()
}

export async function explainConcept(concept, options = {}) {
  return generateGeminiContent(createConceptPrompt(concept), options)
}

export async function generateVisualizationJSON(topic, options = {}) {
  const text = await generateGeminiContent(createVisualizationPrompt(topic), {
    ...options,
    responseMimeType: 'application/json',
  })

  return parseJSONResponse(text)
}

export async function generateVisualizationInstructions(instruction, options = {}) {
  const text = await generateGeminiContent(
    createVisualizationInstructionsPrompt(instruction),
    {
      ...options,
      temperature: options.temperature ?? 0.1,
      responseMimeType: 'application/json',
    },
  )

  return parseJSONResponse(text)
}

export async function generateCodeVisualizationInstructions(
  code,
  language,
  options = {},
) {
  const text = await generateGeminiContent(
    createCodeVisualizationInstructionsPrompt(code, language),
    {
      ...options,
      temperature: options.temperature ?? 0.1,
      responseMimeType: 'application/json',
    },
  )

  return parseJSONResponse(text)
}

export async function generateQuiz(topic, options = {}) {
  const text = await generateGeminiContent(createQuizPrompt(topic, options.difficulty), {
    ...options,
    temperature: options.temperature ?? 0.3,
    responseMimeType: 'application/json',
  })

  return parseJSONResponse(text)
}
