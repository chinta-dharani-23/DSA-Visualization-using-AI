import { useState } from 'react'
import {
  AboutProjectPage,
  ConceptTutorPage,
  HomePage,
  ProgressDashboardPage,
  VisualizationGeneratorPage,
} from './pages'

function App() {
  const [activeView, setActiveView] = useState('home')

  if (activeView === 'concept-tutor') {
    return <ConceptTutorPage onBack={() => setActiveView('home')} />
  }

  if (activeView === 'visualization-generator') {
    return <VisualizationGeneratorPage onBack={() => setActiveView('home')} />
  }

  if (activeView === 'progress-dashboard') {
    return <ProgressDashboardPage onBack={() => setActiveView('home')} />
  }

  if (activeView === 'about') {
    return <AboutProjectPage onBack={() => setActiveView('home')} />
  }

  return (
    <HomePage
      onOpenAbout={() => setActiveView('about')}
      onOpenConceptTutor={() => setActiveView('concept-tutor')}
      onOpenProgressDashboard={() => setActiveView('progress-dashboard')}
      onOpenVisualizationGenerator={() =>
        setActiveView('visualization-generator')
      }
    />
  )
}

export default App
