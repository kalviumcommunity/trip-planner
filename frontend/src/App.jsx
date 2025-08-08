import { useState } from 'react'
import Header from './components/Header'
import TripForm from './components/TripForm'
import TripResults from './components/TripResults'
import './App.css'

function App() {
  const [tripData, setTripData] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const handleFormSubmit = (formData) => {
    setTripData(formData)
    setShowResults(true)
  }

  const handleEdit = () => {
    setShowResults(false)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving trip plan:', tripData)
    alert('Trip plan saved! (Backend integration pending)')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        {!showResults ? (
          <TripForm onSubmit={handleFormSubmit} />
        ) : (
          <TripResults 
            tripData={tripData} 
            onEdit={handleEdit}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  )
}

export default App
