// src/components/BubbleMap.jsx
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import UNIVERSITY_COORDS from "../university_coordinates.js";
import countsByYear from "../university_counts_year.json";

import "./History.css";

const BubbleMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const bubblesRef = useRef([]);
  const [year, setYear] = useState(1950);

  // Initialize map once
  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([20, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(mapInstance.current);
    }
  }, []);

  // Update bubbles when year changes
  useEffect(() => {
    if (!mapInstance.current) return;

    bubblesRef.current.forEach((b) => b.remove());
    bubblesRef.current = [];

    const yearData = countsByYear[year];
    if (!yearData) return;

    const getColor = (count) => {
      const maxVal = 30;
      const t = Math.min(count / maxVal, 1);
      const start = { r: 207, g: 233, b: 201 };
      const end = { r: 45, g: 80, b: 22 };

      const r = Math.round(start.r + (end.r - start.r) * t);
      const g = Math.round(start.g + (end.g - start.g) * t);
      const b = Math.round(start.b + (end.b - start.b) * t);

      return `rgb(${r}, ${g}, ${b})`;
    };

    Object.entries(yearData).forEach(([university, count]) => {
      const coords = UNIVERSITY_COORDS[university];
      if (!coords) return;

      const radius = Math.sqrt(count) * 5;
      const bubbleColor = getColor(count);

      const bubble = L.circleMarker(coords, {
        radius,
        color: bubbleColor,
        fillColor: bubbleColor,
        fillOpacity: 0.65,
        weight: 1.2,
      })
        .bindPopup(`
          <strong>${university}</strong><br/>
          ${count} graduates in ${year}
        `)
        .addTo(mapInstance.current);

      bubblesRef.current.push(bubble);
    });
  }, [year]);

  const years = Object.keys(countsByYear).map(Number).sort((a, b) => a - b);
  const minYear = years[0];
  const maxYear = years[years.length - 1];

  return (
    <div className="history-page-container">

      <header className="homepage-header">
        <h1 className="homepage-title">Mathematics PhD Output by University</h1>
      </header>

      {/* Slider */}
      <div className="slider-container">
        <div className="slider-year-label">{year}</div>
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="custom-slider"
        />
      </div>

      {/* Map */}
      <div ref={mapRef} className="history-map" />
    </div>
  );
};

export default BubbleMap;
