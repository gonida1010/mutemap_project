import { useState, useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import { initial_places } from "./data/mockData";
import FilterBar from "./components/FilterBar";
import PlaceMarker from "./components/PlaceMarker";
import "./App.css";

function App() {
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("myPlaces");
    if (savedData) {
      setPlaces(JSON.parse(savedData));
    } else {
      setPlaces(initial_places);
    }
  }, []);

  const updateStatus = (id, newNoiseLevel) => {
    const updatedPlaces = places.map((place) =>
      place.id === id ? { ...place, noiseLevel: newNoiseLevel } : place
    );
    setPlaces(updatedPlaces);
    localStorage.setItem("myPlaces", JSON.stringify(updatedPlaces));
    alert("상태가 업데이트 되었습니다!");
    setSelectedId(null);
  };

  const filteredPlaces = places.filter((place) => {
    if (filter === "quiet") return place.noiseLevel === 1;
    if (filter === "socket") return place.hasSocket;
    return true;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>Quiet Zone Map</h1>

        <FilterBar currentFilter={filter} onFilterChange={setFilter} />
      </header>

      <div className="map-area">
        <Map
          center={{ lat: 37.498095, lng: 127.02761 }}
          style={{ width: "100%", height: "100%" }}
          level={3}
          onClick={() => setSelectedId(null)}
        >
          {filteredPlaces.map((place) => (
            <PlaceMarker
              key={place.id}
              place={place}
              isSelected={selectedId === place.id}
              onSelect={setSelectedId}
              onUpdateStatus={updateStatus}
            />
          ))}
        </Map>
      </div>
    </div>
  );
}

export default App;
