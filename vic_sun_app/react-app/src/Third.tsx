import React from "react";
import MortalityGraph from "./components/MortalityGraph";
import IncidenceGraph from "./components/IncidenceGraph";
import StateGraph from "./components/StateGraph";
import './ComparisonPage.css'; // Import the CSS file for styling

const ComparisonPage: React.FC = () => {
  return (
    <div className="ComparisonPage">
      <div className="graph-container">
        <div className="comparison-graphs">
          <MortalityGraph />
          <IncidenceGraph />
        </div>
      </div>
      <div className="graph-container">
        <StateGraph />
      </div>
    </div>
  );
};

export default ComparisonPage;
