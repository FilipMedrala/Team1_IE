import React, { useState, useEffect } from "react";
import '../App.css';
import statedata from '../data/cancer_states.json';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const AreaChartComponent: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const states = Array.from(new Set(statedata.map(item => item["State or Territory"])));

  // Predefined color palette
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'];

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "All") {
      setSelectedStates(states);
    } else {
      setSelectedStates([value]);
    }
  };

  useEffect(() => {
    setSelectedStates(states); // Initialize selectedStates with all states
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const filteredData = selectedStates.length > 0 ? statedata.filter(item => selectedStates.includes(item["State or Territory"])) : statedata;

  return (
    <div className="AreaChartComponent">
      <Typography variant="h4" gutterBottom className="chart-title">Cancer Incidence by State or Territory</Typography>
      <select onChange={handleStateChange}>
        <option value="All">Select All States</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <ResponsiveContainer width="90%" height={800}>
        <AreaChart
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" type="number" domain={['dataMin', 'dataMax']} />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedStates.map((state, index) => (
            <Area key={state} type="monotone" dataKey="Count" name={state} data={filteredData.filter(item => item["State or Territory"] === state)} stackId="1" stroke={colors[index % colors.length]} fill={colors[index % colors.length]} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
