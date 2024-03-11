import React, { useState } from "react";
import '../App.css';
import incidencedata from '../data/cancer_incidence.json';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const IncidenceGraph: React.FC = () => {
  const ageCategories = ["Child Age from 0-14", "Young Adults from 17-30", "Middle Age Adults 31-45", "Old Aged Adults 45+"];

  // Predefined color palette
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'];

  const [selectedAgeCategories, setSelectedAgeCategories] = useState<string[]>(ageCategories);

  const handleAgeCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "Select All Age Categories") {
      setSelectedAgeCategories(ageCategories);
    } else {
      setSelectedAgeCategories([value]);
    }
  };

  const filteredData = selectedAgeCategories.length > 0 ? incidencedata.filter(item => selectedAgeCategories.includes(item["Age Category"])) : [];

  return (
    <div className="IncidenceGraph">
      <Typography variant="h4" gutterBottom className="graph-title">Cancer Incidence from 1983 to 2023</Typography>
      <select onChange={handleAgeCategoryChange}>
        <option value="Select All Age Categories">Select All Age Categories</option>
        {ageCategories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="Year" domain={[1982, 2023]} />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 5, lineHeight: '20px', padding: '10px' }} />
          {selectedAgeCategories.map((category, index) => (
            <Line key={index} type="monotone" dataKey="Count" name={category} data={filteredData.filter(item => item["Age Category"] === category)} stroke={colors[index % colors.length]} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncidenceGraph;
