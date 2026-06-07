import {
  generateCodeVisualizationInstructions,
  generateVisualizationInstructions,
} from '../ai'

export const visualizationInstructionSchema = {
  input: 'string',
  sourceType: 'natural-language | code',
  language: 'c | cpp | java | python | javascript | null',
  domain: 'data-structure | algorithm | pattern',
  structure:
    'array | string | linked-list | stack | queue | tree | bst | avl | heap | trie | graph | unknown',
  algorithm:
    'bfs | dfs | dijkstra | merge-sort | quick-sort | insertion-sort | binary-search | recursion | backtracking | dynamic-programming | greedy | none',
  operation:
    'insert | delete | push | pop | enqueue | dequeue | reverse | sort | search | traverse | shortest-path | build | run | unknown',
  values: [],
  startNode: null,
  target: null,
  nodes: [],
  edges: [],
  options: {},
  steps: [],
}

const fallbackInstruction = {
  input: '',
  sourceType: 'natural-language',
  language: null,
  domain: 'algorithm',
  structure: 'unknown',
  algorithm: 'none',
  operation: 'unknown',
  values: [],
  startNode: null,
  target: null,
  nodes: [],
  edges: [],
  options: {},
  steps: [],
}

function ensureArray(value) {
  return Array.isArray(value) ? value : []
}

function ensureObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

export function normalizeVisualizationInstruction(parsedInstruction, input) {
  const instruction = ensureObject(parsedInstruction)

  return {
    ...fallbackInstruction,
    ...instruction,
    input: typeof instruction.input === 'string' ? instruction.input : input,
    sourceType:
      typeof instruction.sourceType === 'string'
        ? instruction.sourceType
        : fallbackInstruction.sourceType,
    language:
      typeof instruction.language === 'string'
        ? instruction.language
        : fallbackInstruction.language,
    values: ensureArray(instruction.values),
    nodes: ensureArray(instruction.nodes),
    edges: ensureArray(instruction.edges),
    options: ensureObject(instruction.options),
    steps: ensureArray(instruction.steps).map((step, index) => ({
      id: typeof step?.id === 'string' ? step.id : `step-${index + 1}`,
      action: typeof step?.action === 'string' ? step.action : 'unknown',
      payload: ensureObject(step?.payload),
      description:
        typeof step?.description === 'string' ? step.description : '',
    })),
  }
}

export async function parseVisualizationInstruction(input, options = {}) {
  const trimmedInput = input.trim()

  if (!trimmedInput) {
    throw new Error('Enter a visualization instruction first.')
  }

  const parsedInstruction = await generateVisualizationInstructions(
    trimmedInput,
    options,
  )

  return normalizeVisualizationInstruction(parsedInstruction, trimmedInput)
}

export async function parseCodeVisualizationInstruction(
  code,
  language,
  options = {},
) {
  const trimmedCode = code.trim()

  if (!trimmedCode) {
    throw new Error('Paste code to visualize first.')
  }

  const parsedInstruction = await generateCodeVisualizationInstructions(
    trimmedCode,
    language,
    options,
  )

  return normalizeVisualizationInstruction(parsedInstruction, trimmedCode)
}
