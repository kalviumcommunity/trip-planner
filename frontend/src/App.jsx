import { useState } from "react";
import Header from "./components/Header";
import TripForm from "./components/TripForm";
import TripResults from "./components/TripResults";
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
      const response = await fetch("http://localhost:5000/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Saved plan:", data);
        alert("Trip plan saved!");
      } else {
        const err = await response.json().catch(() => ({}));
        alert(err.error || "Failed to save plan");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving plan");
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
