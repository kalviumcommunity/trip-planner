import React, { useState } from 'react';

const StructuredTripDisplay = ({ tripData }) => {
  const [activeDay, setActiveDay] = useState(0);
  const [showRawJSON, setShowRawJSON] = useState(false);

  if (!tripData || !tripData.tripPlan) {
    return (
      <div className="text-center text-gray-500 py-8">
        No structured trip data available
      </div>
    );
  }

  const { tripPlan } = tripData;

  const renderActivity = (activity, index) => (
    <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {activity.time}
        </span>
        <span className="text-sm text-gray-600">{activity.duration}</span>
      </div>
      <h4 className="font-semibold text-gray-800 mt-2">{activity.activity}</h4>
      <p className="text-gray-600 text-sm">📍 {activity.location}</p>
      {activity.tips && (
        <p className="text-blue-600 text-sm mt-1">💡 {activity.tips}</p>
      )}
    </div>
  );

  const renderMeal = (meal, mealType) => (
    <div className="bg-green-50 rounded-lg p-3 mb-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
          {meal.time}
        </span>
        <span className="text-xs text-gray-500 capitalize">{mealType}</span>
      </div>
      <h4 className="font-semibold text-gray-800 mt-2">{meal.restaurant}</h4>
      <p className="text-gray-600 text-sm">🍽️ {meal.cuisine}</p>
      <p className="text-gray-600 text-sm">⭐ {meal.specialty}</p>
      {meal.booking && (
        <p className="text-orange-600 text-sm mt-1">📅 {meal.booking}</p>
      )}
    </div>
  );

  const renderDay = (day, dayIndex) => (
    <div key={dayIndex} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Day {day.day}: {day.theme}
        </h3>
        <span className="text-sm text-gray-500">Day {day.day}</span>
      </div>

      {/* Morning Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          🌅 Morning
        </h4>
        <div className="space-y-2">
          {day.morning.activities.map((activity, index) => renderActivity(activity, index))}
          {day.morning.lunch && renderMeal(day.morning.lunch, 'Lunch')}
        </div>
      </div>

      {/* Afternoon Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          ☀️ Afternoon
        </h4>
        <div className="space-y-2">
          {day.afternoon.activities.map((activity, index) => renderActivity(activity, index))}
        </div>
      </div>

      {/* Evening Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          🌙 Evening
        </h4>
        <div className="space-y-2">
          {day.evening.activities.map((activity, index) => renderActivity(activity, index))}
          {day.evening.dinner && renderMeal(day.evening.dinner, 'Dinner')}
        </div>
      </div>

      {/* Daily Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {day.dailyTip && (
          <div className="bg-blue-50 rounded-lg p-3">
            <h5 className="font-semibold text-blue-800 mb-2">💡 Daily Tip</h5>
            <p className="text-blue-700 text-sm">{day.dailyTip}</p>
          </div>
        )}
        {day.localSecret && (
          <div className="bg-purple-50 rounded-lg p-3">
            <h5 className="font-semibold text-purple-800 mb-2">🤫 Local Secret</h5>
            <p className="text-purple-700 text-sm">{day.localSecret}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {tripPlan.destination} Adventure
        </h1>
        <p className="text-xl opacity-90">
          {tripPlan.duration}-Day Trip for {tripPlan.interests} Enthusiasts
        </p>
        <p className="opacity-80 mt-2">{tripPlan.summary}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tripPlan.days.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeDay === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      {/* Day Content */}
      <div className="mb-6">
        {renderDay(tripPlan.days[activeDay], activeDay)}
      </div>

      {/* General Tips & Cultural Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* General Tips */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 General Tips</h3>
          <ul className="space-y-2">
            {tripPlan.generalTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cultural Notes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🌍 Cultural Notes</h3>
          <ul className="space-y-2">
            {tripPlan.culturalNotes.map((note, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">ℹ️</span>
                <span className="text-gray-700">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Budget Estimates */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Budget Estimates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">🏨</div>
            <div className="text-sm text-gray-600">Accommodation</div>
            <div className="font-semibold text-gray-800">{tripPlan.budgetEstimates.accommodation}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">🍽️</div>
            <div className="text-sm text-gray-600">Food</div>
            <div className="font-semibold text-gray-800">{tripPlan.budgetEstimates.food}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">🎯</div>
            <div className="text-sm text-gray-600">Activities</div>
            <div className="font-semibold text-gray-800">{tripPlan.budgetEstimates.activities}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">🚗</div>
            <div className="text-sm text-gray-600">Transportation</div>
            <div className="font-semibold text-gray-800">{tripPlan.budgetEstimates.transportation}</div>
          </div>
        </div>
      </div>

      {/* Raw JSON Toggle */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowRawJSON(!showRawJSON)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {showRawJSON ? 'Hide' : 'Show'} Raw JSON Data
        </button>
      </div>

      {/* Raw JSON Display */}
      {showRawJSON && (
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <pre className="text-green-400 text-sm overflow-x-auto">
            {JSON.stringify(tripData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default StructuredTripDisplay;
