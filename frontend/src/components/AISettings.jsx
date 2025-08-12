import React, { useState } from 'react';

const AISettings = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          🤖 AI Generation Settings
        </h3>
        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Temperature Control */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Creativity Level (Temperature): {settings.temperature}
              </label>
              <span className="text-xs text-gray-500">
                {settings.temperature <= 0.3 ? 'Conservative' : 
                 settings.temperature <= 0.7 ? 'Balanced' : 'Creative'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Conservative (0)</span>
              <span>Balanced (0.5)</span>
              <span>Creative (1)</span>
            </div>
          </div>

          {/* Top-K Control */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Response Variety (Top-K): {settings.topK}
              </label>
              <span className="text-xs text-gray-500">
                {settings.topK <= 20 ? 'Focused' : 
                 settings.topK <= 50 ? 'Balanced' : 'Diverse'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={settings.topK}
              onChange={(e) => handleSettingChange('topK', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Focused (10)</span>
              <span>Balanced (50)</span>
              <span>Diverse (100)</span>
            </div>
          </div>

          {/* Top-P Control */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Response Coherence (Top-P): {settings.topP}
              </label>
              <span className="text-xs text-gray-500">
                {settings.topP <= 0.5 ? 'Strict' : 
                 settings.topP <= 0.8 ? 'Balanced' : 'Flexible'}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={settings.topP}
              onChange={(e) => handleSettingChange('topP', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Strict (0.1)</span>
              <span>Balanced (0.8)</span>
              <span>Flexible (1)</span>
            </div>
          </div>

          {/* Max Tokens Control */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Response Length (Max Tokens): {settings.maxTokens}
              </label>
              <span className="text-xs text-gray-500">
                {settings.maxTokens <= 500 ? 'Concise' : 
                 settings.maxTokens <= 1000 ? 'Detailed' : 'Comprehensive'}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={settings.maxTokens}
              onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Concise (200)</span>
              <span>Detailed (1000)</span>
              <span>Comprehensive (2000)</span>
            </div>
          </div>

          {/* Prompting Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompting Method:
            </label>
            <select
              value={settings.promptingMethod}
              onChange={(e) => handleSettingChange('promptingMethod', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="zero-shot">Zero-shot (Basic)</option>
              <option value="one-shot">One-shot (Single Example)</option>
              <option value="multi-shot">Multi-shot (Multiple Examples)</option>
              <option value="chain-of-thought">Chain of Thought (Reasoning)</option>
              <option value="dynamic">Dynamic (Contextual)</option>
              <option value="system-user">System-User (RTFC Framework)</option>
              <option value="structured-output">Structured Output (JSON)</option>
            </select>
          </div>

          {/* Reset to Defaults */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onSettingsChange({
                temperature: 0.7,
                topK: 40,
                topP: 0.8,
                maxTokens: 1000,
                promptingMethod: 'one-shot'
              })}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISettings;
