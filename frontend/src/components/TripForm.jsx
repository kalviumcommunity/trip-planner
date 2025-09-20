import React, { useState } from "react";
import { INTEREST_OPTIONS } from "../constants/interests";
import AISettings from "./AISettings";
import config from "../config";

const TripForm = ({ onSubmit, initialData }) => {
  const [destination, setDestination] = useState(
    initialData?.destination || ""
  );
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [interests, setInterests] = useState(initialData?.interests || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiSettings, setAiSettings] = useState({
    temperature: 0.7,
    topK: 40,
    topP: 0.8,
    maxTokens: 1000,
    promptingMethod: "one-shot",
  });

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    return diffTime > 0
      ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const days = calculateDays();
    if (!days) {
      setError("Please select valid start and end dates.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/generate-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          days,
          interests,
          aiSettings, // Include AI settings in the request
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onSubmit({
          destination,
          startDate,
          endDate,
          days,
          interests,
          plan: data.plan,
        });
      } else {
        setError(data.error || "Failed to generate plan.");
      }
    } catch (err) {
      setError("Error connecting to server.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >
      {/* Destination */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          📍 Destination
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your destination"
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            🗓 Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            🗓 End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-gray-700 font-semibold mb-3">
          🎯 Your Interests
        </label>
        <div className="flex flex-wrap gap-3">
          {INTEREST_OPTIONS.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => toggleInterest(option.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                interests.includes(option.id)
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100"
              }`}
            >
              {option.icon} {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Settings */}
      <AISettings settings={aiSettings} onSettingsChange={setAiSettings} />

      {/* Error */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "Generating..." : "🚀 Generate Trip Plan"}
      </button>
    </form>
  );
};

export default TripForm;
