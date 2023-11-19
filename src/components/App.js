import React, { useState} from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const handleChangeType = (type) => {
    setFilters({ type });
  };

  const handleFindPetsClick = async () => {
    let apiUrl = "http://localhost:3001/pets";

    if (filters.type !== "all") {
      apiUrl += `?type=${filters.type}`;
    }

    const response = await fetch(apiUrl);
    const petData = await response.json();

    setPets(petData);
  };

  const handleAdoptPet = (petId) => {
    // Your logic to handle pet adoption
    console.log(`Pet with ID ${petId} adopted!`);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleChangeType}
              onFindPetsClick={handleFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
