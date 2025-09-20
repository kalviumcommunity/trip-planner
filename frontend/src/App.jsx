import { useState } from "react";
import Header from "./components/Header";
import TripForm from "./components/TripForm";
import TripResults from "./components/TripResults";
import config from "./config";
import "./App.css";

function App() {
  const [tripData, setTripData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (formData) => {
    setTripData(formData);
    setShowResults(true);
  };

  const handleEdit = () => {
    setShowResults(false);
  };

  const handleSave = async () => {
    if (!tripData) return;
    try {
      console.log("Saving plan to:", `${config.apiBaseUrl}/plans`);
      const response = await fetch(`${config.apiBaseUrl}/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(tripData),
      });

      console.log("Save response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Saved plan:", data);
        alert("Trip plan saved successfully!");
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }
    } catch (e) {
      console.error("Save error:", e);
      alert(`Error saving plan: ${e.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />

        {!showResults ? (
          <TripForm onSubmit={handleFormSubmit} initialData={tripData} />
        ) : (
          <TripResults
            tripData={tripData}
            onEdit={handleEdit}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}

export default App;
