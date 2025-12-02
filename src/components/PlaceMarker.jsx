import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";

const PlaceMarker = ({ place, isSelected, onSelect, onUpdateStatus }) => {
  return (
    <MapMarker
      position={{ lat: place.lat, lng: place.lng }}
      image={{
        src:
          place.noiseLevel === 1
            ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
            : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
        size: { width: 24, height: 35 },
      }}
      onClick={() => onSelect(place.id)}
    >
      {isSelected && (
        <div className="info-window">
          <strong>{place.name}</strong>
          <p>
            {place.hasSocket ? "⚡콘센트 있음" : "❌콘센트 없음"}
            <br />
            상태: {place.noiseLevel === 1 ? "🔇조용함" : "🔊시끄러움"}
          </p>
          <div className="btn-group">
            <button onClick={() => onUpdateStatus(place.id, 1)}>
              조용해요
            </button>
            <button onClick={() => onUpdateStatus(place.id, 3)}>
              시끄러워요
            </button>
          </div>
        </div>
      )}
    </MapMarker>
  );
};

export default PlaceMarker;
