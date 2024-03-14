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
          <div>The graph illustrates skin cancer mortality trends from 1971 to 2023 across different age groups. Each age category—Child (0-14), Young Adults (17-30), Middle Age Adults (31-45), and Old Aged Adults (45+)—is represented, showing varying levels of mortality. Notably, older age groups generally exhibit higher mortality rates, while younger age groups show sporadic or stable patterns. This visualization offers insights into age-related trends in skin cancer mortality over the specified time frame.</div>
          <IncidenceGraph />
          <div>The graph depicts the incidence of skin cancer across different age groups from 1982 to 2023. The age categories include Child Age (0-14), Young Adults (17-30), Middle Age Adults (31-45), and Old Aged Adults (45+). Each year's count of reported cases is represented for each age group. Notably, the incidence generally increases with age, with older adults showing higher numbers compared to younger age groups. This visualization offers insights into the changing trends of skin cancer incidence across various age demographics over the specified time period.
          </div>
        </div>
      </div>
      <div className="graph-container">
        <StateGraph />
      </div>
    </div>
  );
};

export default ComparisonPage;
