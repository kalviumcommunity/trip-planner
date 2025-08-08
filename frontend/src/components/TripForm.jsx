import { useState } from 'react'
import { INTEREST_OPTIONS } from '../constants/interests'

const TripForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    interests: []
  })

  const interestOptions = INTEREST_OPTIONS

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestChange = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Enter your dream destination..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Travel Interests
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interestOptions.map((interest) => (
              <label
                key={interest.id}
                className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest.id)}
                  onChange={() => handleInterestChange(interest.id)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-lg mr-2">{interest.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {interest.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🚀 Generate Trip Plan
          </button>
        </div>
      </form>
    </div>
  )
}

export default TripForm
