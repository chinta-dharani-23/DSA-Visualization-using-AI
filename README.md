# DSA Vision AI

AI-powered learning app for data structures and algorithms. The app combines Gemini-generated explanations, quiz generation, structured visualization instructions, and local progress tracking in a single demo-friendly interface.

## What the app does

- AI workflow: user input is sent to Gemini, normalized in the app, and rendered in a feature-specific UI.
- AI model output: text explanations, quiz JSON, and visualization JSON.
- User interaction: topic selection, AI concept tutor, prompt/code visualization, quizzes, and progress review.
- 3D / 2.5D visualization: motion-based cards, layered surfaces, and animated graph/array/tree previews.
- Simulations: generated visualization instructions feed the engine preview.
- Practical activities: code input and natural-language prompts are converted into visualization plans.
- Mobile responsive UI: layouts collapse into a single-column flow on smaller screens.
- Progress tracking: quiz scores are stored locally and summarized into dashboard insights.

## Architecture

1. `src/ai/gemini.js` handles Gemini requests and response parsing.
2. `src/parser/visualizationInstructionParser.js` normalizes instruction payloads.
3. `src/engine/visualizationEngine.js` maps parsed instructions to a visual topic.
4. `src/visualizers/` renders the reusable visual components.
5. `src/components/QuizModule.jsx` creates quizzes and saves scores locally.
6. `src/hooks/useLocalScores.js` persists progress in browser storage.

## Gemini integration

- `explainConcept()` generates beginner-friendly explanations.
- `generateQuiz()` creates multiple-choice quizzes in JSON.
- `generateVisualizationInstructions()` and `generateCodeVisualizationInstructions()` produce engine-ready JSON.


## Demo flow

1. Open the AI Visual Concept Tutor.
2. Ask for an explanation and review the quiz.
3. Open the code / natural language visualizer to see structured JSON.
4. Finish with the progress dashboard to show persistence and learning progress.
