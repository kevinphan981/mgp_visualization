// src/components/History.jsx
import React from 'react';
import BubbleMapWithSlider from './BubbleMap';
import './Homepage.css'; 
import './History.css';

function History() {
  return (
    <div className="homepage"> 
      <div className="homepage-container">

        {/* Bubble Map Section */}
        <div className="history-map-section">
          <BubbleMapWithSlider />
        </div>

        {/* Unified Info Card */}
        <div className="info-section">
          <div className="info-card">

            {/* NEW — Mathematics Genealogy History */}
            <h3>Mathematical Lineage & The Mathematics Genealogy Project</h3>
            <p>
              The Mathematics Genealogy Project documents the academic “family tree” 
              of mathematicians, tracing advisor–student relationships across centuries. 
              By mapping where and when doctorates were earned, we can visualize how 
              mathematical knowledge spreads through generations and across continents.
            </p>

            <p style={{ marginTop: "1rem" }}>
              Mathematical lineage reflects shared problem-solving traditions and research 
              schools. Many historic breakthroughs arose from tightly connected communities 
              of scholars whose work built upon one another. Understanding these lineages 
              helps reveal how influential mathematical centers developed, migrated, and 
              interacted over time.
            </p>

            {/* Visualization Explanation */}
            <h3 style={{ marginTop: "2rem" }}>About This Visualization</h3>
            <p>
              This interactive bubble map shows the global distribution of mathematics PhD 
              graduates over time. Use the slider above the map to explore how mathematical 
              research shifted across institutions and continents from the 1600s to today.
            </p>

            <p>
              <strong>Bubble Size</strong>: Indicates how many PhDs were recorded at a 
              university in the selected year.
            </p>

            <p>
              <strong>Geographic Trends</strong>: Watch mathematical activity expand across 
              Europe, North America, and eventually worldwide.
            </p>

            <p>
              <strong>Data Source</strong>: Extracted from the full Mathematics Genealogy 
              Project dataset and geocoded using university location metadata.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default History;
