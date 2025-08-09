import { INTEREST_OPTIONS } from '../constants/interests'

const TripResults = ({ tripData, onEdit, onSave }) => {
  const interestOptions = INTEREST_OPTIONS

  const getInterestLabels = (interestIds) => {
    return interestIds.map(id => 
      interestOptions.find(option => option.id === id)?.label
    ).filter(Boolean)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        📋 Your Trip Plan
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trip Details */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">📍 Destination</h3>
            <p className="text-lg text-blue-900">{tripData.destination}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">📅 Travel Dates</h3>
            <p className="text-lg text-green-900">
              {tripData.startDate} to {tripData.endDate}
            </p>
            {tripData.days && (
              <p className="text-sm text-green-800 mt-1">Total days: {tripData.days}</p>
            )}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-3">🎯 Your Interests</h3>
          {tripData.interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {getInterestLabels(tripData.interests).map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                >
                  {interestOptions.find(opt => opt.label === interest)?.icon} {interest}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-purple-600 italic">No interests selected</p>
          )}
        </div>
      </div>

      {/* AI Plan */}
      {tripData.plan && (
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="font-semibold text-amber-900 mb-3">🤖 AI-Generated Itinerary</h3>
          <div className="whitespace-pre-wrap text-amber-900 leading-relaxed">
            {tripData.plan}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onEdit}
          className="flex-1 bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          ✏️ Edit Plan
        </button>
        <button
          onClick={onSave}
          className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          💾 Save Plan
        </button>
      </div>
    </div>
  )
}

export default TripResults
