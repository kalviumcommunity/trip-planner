import React, { useState } from 'react';

const AIFunctionCaller = ({ tripData, onFunctionCall }) => {
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionParams, setFunctionParams] = useState({});
  const [isExecuting, setIsExecuting] = useState(false);

  const availableFunctions = [
    {
      id: 'bookRestaurant',
      name: 'Book Restaurant',
      description: 'Get booking information and availability for restaurants',
      icon: '🍽️',
      params: {
        restaurant: '',
        date: '',
        time: '',
        guests: 2
      }
    },
    {
      id: 'getWeather',
      name: 'Check Weather',
      description: 'Get weather forecast for your destination',
      icon: '🌤️',
      params: {
        location: '',
        date: ''
      }
    },
    {
      id: 'calculateBudget',
      name: 'Calculate Budget',
      description: 'Calculate detailed budget breakdown for your trip',
      icon: '💰',
      params: {
        duration: 3,
        accommodationType: 'hotel',
        foodPreference: 'mixed',
        activityLevel: 'moderate'
      }
    },
    {
      id: 'findSimilarDestinations',
      name: 'Find Similar Places',
      description: 'Discover destinations similar to your current choice',
      icon: '🌍',
      params: {
        currentDestination: '',
        interests: [],
        budget: 'medium'
      }
    },
    {
      id: 'getLocalInsights',
      name: 'Local Insights',
      description: 'Get insider tips and local knowledge',
      icon: '🤫',
      params: {
        destination: '',
        category: 'food' // food, culture, nightlife, shopping
      }
    },
    {
      id: 'optimizeItinerary',
      name: 'Optimize Itinerary',
      description: 'Optimize your schedule for better efficiency',
      icon: '⚡',
      params: {
        currentPlan: {},
        preferences: {
          earlyBird: false,
          nightOwl: false,
          relaxed: true
        }
      }
    }
  ];

  const handleFunctionSelect = (functionId) => {
    const func = availableFunctions.find(f => f.id === functionId);
    setSelectedFunction(functionId);
    setFunctionParams(func.params);
  };

  const handleParamChange = (key, value) => {
    setFunctionParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const executeFunction = async () => {
    if (!selectedFunction) return;

    setIsExecuting(true);
    try {
      // Auto-fill some parameters from trip data if available
      const enhancedParams = {
        ...functionParams,
        ...(tripData?.destination && { location: tripData.destination }),
        ...(tripData?.destination && { currentDestination: tripData.destination }),
        ...(tripData?.destination && { destination: tripData.destination }),
        ...(tripData?.interests && { interests: tripData.interests }),
        ...(tripData?.days && { duration: tripData.days })
      };

      await onFunctionCall(selectedFunction, enhancedParams);
    } catch (error) {
      console.error('Function execution failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const renderParamInputs = () => {
    if (!selectedFunction) return null;

    const func = availableFunctions.find(f => f.id === selectedFunction);
    if (!func) return null;

    return (
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-3">Function Parameters</h4>
        <div className="space-y-3">
          {Object.entries(func.params).map(([key, defaultValue]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </label>
              {typeof defaultValue === 'boolean' ? (
                <select
                  value={functionParams[key] || defaultValue}
                  onChange={(e) => handleParamChange(key, e.target.value === 'true')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              ) : typeof defaultValue === 'number' ? (
                <input
                  type="number"
                  value={functionParams[key] || defaultValue}
                  onChange={(e) => handleParamChange(key, parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : Array.isArray(defaultValue) ? (
                <input
                  type="text"
                  value={Array.isArray(functionParams[key]) ? functionParams[key].join(', ') : ''}
                  onChange={(e) => handleParamChange(key, e.target.value.split(',').map(s => s.trim()))}
                  placeholder="Enter values separated by commas"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <input
                  type="text"
                  value={functionParams[key] || defaultValue}
                  onChange={(e) => handleParamChange(key, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        🚀 AI Function Calling
      </h3>
      <p className="text-gray-600 mb-6">
        Use AI-powered functions to enhance your trip planning experience
      </p>

      {/* Function Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select AI Function:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableFunctions.map((func) => (
            <button
              key={func.id}
              onClick={() => handleFunctionSelect(func.id)}
              className={`p-3 text-left rounded-lg border transition-colors ${
                selectedFunction === func.id
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{func.icon}</span>
                <span className="font-semibold">{func.name}</span>
              </div>
              <p className="text-sm text-gray-600">{func.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Inputs */}
      {renderParamInputs()}

      {/* Execute Button */}
      {selectedFunction && (
        <div className="text-center">
          <button
            onClick={executeFunction}
            disabled={isExecuting}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isExecuting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isExecuting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Executing...
              </span>
            ) : (
              `Execute ${availableFunctions.find(f => f.id === selectedFunction)?.name}`
            )}
          </button>
        </div>
      )}

      {/* Function Status */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">How It Works</h4>
        <p className="text-blue-700 text-sm">
          AI Function Calling allows the AI to execute specific tasks like checking weather, 
          calculating budgets, or finding similar destinations. The AI will process your request 
          and provide actionable results that enhance your trip planning experience.
        </p>
      </div>
    </div>
  );
};

export default AIFunctionCaller;
